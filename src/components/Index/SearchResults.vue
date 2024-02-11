<script setup>
    import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const route = useRoute();
    const store = useStore();

    const storeOneCity = computed(() => store.getters[`${route.name}/oneCity`]);
    const storeSearchText = computed(() => store.getters[`${route.name}/searchText`]);

    const storeSelectRelevantOrNearby = computed(() => {
        return store.getters[`${route.name}/selectRelevantOrNearby`];
    });

    // 此變數 只有 景點頁 才有
    const storeCheckboxTicket = computed(() => store.getters[`Landscape/checkboxTicket`]);

    // 此 store變數 只有 活動頁 才有
    const storeDateTime = computed(() => store.getters["Activity/dateTime"]);

    const storeCategory = computed(() => store.getters[`${route.name}/category`]);
    const storeResetFilter = computed(() => store.getters[`${route.name}/resetFilter`]);

    const storeShowSearchResultArr = computed(() => {
        return store.getters[`${route.name}/showSearchResultArr`];
    });

    const elSelect = ref(null);
    const elCheckbox = ref(null);
    const elInputDate = ref(null);
    const elCategory = ref(null);
    const selectRelevantOrNearby = ref("relevant");  // 預設是 找尋相關的結果
    const checkboxTicket = ref(false);
    const dateTime = ref("");
    const isOpenForNoResult = ref(false);
    const isOpenScrollFilter = ref(false);
    const routeChange = ref(false);  // 判斷 路由是否已改變。

    const searchObj = reactive({
        searchText: storeSearchText.value,
        oneCity: storeOneCity.value,
    });

    const coordsObj = reactive({
        latitude: 0,
        longitude: 0,
    });

    const categoryObj = reactive({
        searchResultArr: [],
        category: "",
    });

    const pageDataObj = reactive({
        viewsName: "",  // 行動版時，提示目前所處的頁面文字。
        dynamicId: "",  // 動態id 名稱。
        searchResultsTitleName: "",  // 搜尋結果中，每個item的標題文字。
        buttonNameOfCategory: [],  // 類別按鈕的名稱。
        buttonValueOfCategory: [],  // 類別按鈕的值。
    });

    switch(route.name) {
        case "Landscape":
            pageDataObj.viewsName = "景點";
            pageDataObj.dynamicId = "ScenicSpotID";
            pageDataObj.searchResultsTitleName = "ScenicSpotName";
            pageDataObj.buttonNameOfCategory = [
                "自然風景類", "遊憩類", "文化類", "藝術類",
            ];
            pageDataObj.buttonValueOfCategory = [
                "自然風景", "遊憩玩樂", "文化古蹟", "藝文空間",
            ];

            break;
        case "Foods":
            pageDataObj.viewsName = "美食";
            pageDataObj.dynamicId = "RestaurantID";
            pageDataObj.searchResultsTitleName = "RestaurantName";
            pageDataObj.buttonNameOfCategory = [
                "中式美食", "異國料理", "甜點冰品", "伴手禮",
            ];
            pageDataObj.buttonValueOfCategory = [
                "中式美食", "異國料理", "甜點冰品", "特色伴手禮",
            ];

            break;
        case "Activity":
            pageDataObj.viewsName = "活動";
            pageDataObj.dynamicId = "ActivityID";
            pageDataObj.searchResultsTitleName = "ActivityName";
            pageDataObj.buttonNameOfCategory = [
                "年度活動", "節慶活動", "藝文活動", "親近山海",
            ];
            pageDataObj.buttonValueOfCategory = [
                "年度活動", "節慶活動", "藝文活動", "親近山海",
            ];

            break;
        case "Hotel":
            pageDataObj.viewsName = "住宿";
            pageDataObj.dynamicId = "HotelID";
            pageDataObj.searchResultsTitleName = "HotelName";
            pageDataObj.buttonNameOfCategory = [
                "一般旅館", "一般觀光旅館", "國際觀光旅館", "民宿",
            ];
            pageDataObj.buttonValueOfCategory = [
                "一般旅館", "觀光旅館", "國際旅館", "民宿",
            ];
            break;
        default:
            console.log("HomePage or not match");
    }

    const toggleScrollFilter = () => isOpenScrollFilter.value = !isOpenScrollFilter.value;

    const clearClass = () => {
        elCategory.value.childNodes.forEach(item => item.classList.remove("active"));
    };

    const getPosition = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            coordsObj.latitude = position.coords.latitude;
            coordsObj.longitude = position.coords.longitude;

            resolve();
        }, (error) => {
            console.log(error);

            reject("It's not catch current position");
        }, {
            enableHighAccuracy: true,  // 使用 高精確度。
        });
    });

    async function changeSelectOption(newOption) {
        try {
            if (newOption === "nearby") {
                // 一切換到 nearby，就也同步改變 store中的 option
                await store.dispatch(`${route.name}/handChangeSelectRelevantOrNearby`, "nearby");

                // 切換成 附近結果的 所有資料。
                await store.dispatch(`${route.name}/handNearbyOfSearchResultArrInit`, coordsObj);
            }

            else if (newOption === "relevant") {
                // 一切換到 relevant，就也同步改變 store中的 option
                await store.dispatch(`${route.name}/handChangeSelectRelevantOrNearby`, "relevant");

                // 切換成 相關結果的 所以資料。
                await store.dispatch(`${route.name}/handShowSearchResultArrInit`, searchObj);
            }
        }

        catch(error) {
            console.log(error);
        }
    }
    
    async function changeCheckboxTicket(isCheck) {  // 景點頁專用
        try {
            // 從無勾選 -> 變到有勾選，都做 訂票資訊的篩選。
            if (isCheck) {
                await store.dispatch(`${route.name}/handCheckTicketInfo`);

                elSelect.value.disabled = true;
            }

            // 相關結果　從 有勾選 -> 無勾選，還原 相關結果的 所有資料。
            else if (!isCheck && selectRelevantOrNearby.value === "relevant") {
                await store.dispatch(`${route.name}/handShowSearchResultArrInit`, searchObj);

                elSelect.value.disabled = false;
            }

            // 附近結果 從有勾選 -> 無勾選，還原 附近結果的 所有資料
            else if (!isCheck && selectRelevantOrNearby.value === "nearby") {
                await store.dispatch(`${route.name}/handNearbyOfSearchResultArrInit`, coordsObj);

                elSelect.value.disabled = false;
            }

            // 儲存該頁面最後 是否有勾選 Checkbox。
            await store.dispatch(`${route.name}/handCheckboxTicketInit`, isCheck);
        }

        catch(error) {
            console.log(error);
        }
    }

    async function changeDate(selectDate) {  // 活動頁專用
        try {
            let date = +new Date(`${selectDate}`);

            // 從無選擇日期 -> 變到有選擇日期，都做 指定日期的篩選。
            if (!isNaN(date) && selectRelevantOrNearby.value === "relevant") {
                await store.dispatch(`${route.name}/handShowSearchResultArrInit`, searchObj);
                await store.dispatch(`${route.name}/handSelectDate`, date);

                elSelect.value.disabled = true;
            }

            else if (!isNaN(date) && selectRelevantOrNearby.value === "nearby") {
                await store.dispatch(`${route.name}/handNearbyOfSearchResultArrInit`, coordsObj);
                await store.dispatch(`${route.name}/handSelectDate`, date);

                elSelect.value.disabled = true;
            }

            // 相關結果　從 有勾選日期 -> 無勾選日期，還原 相關結果的 所有資料。
            else if (isNaN(date) && selectRelevantOrNearby.value === "relevant") {
                await store.dispatch(`${route.name}/handShowSearchResultArrInit`, searchObj);

                elSelect.value.disabled = false;
            }

            // 附近結果 從有勾選 -> 無勾選，還原 附近結果的 所有資料
            else if (isNaN(date) && selectRelevantOrNearby.value === "nearby") {
                await store.dispatch(`${route.name}/handNearbyOfSearchResultArrInit`, coordsObj);

                elSelect.value.disabled = false;
            }

            // 最後 紀錄 活動頁 最後選定的日期值。
            await store.dispatch(`${route.name}/handDateTimeInit`, selectDate);
        }

        catch(error) {
            console.log(error);
        }
    }

    const filterClass = async (e) => {
        try {
            if (e === "recover") {  // 切換回某個頁面時，進入還原資料的步驟。
                clearClass();

                elCategory.value.childNodes.forEach(item => {  // 還原 原本按下的按鈕
                    if (item.dataset.category === categoryObj.category) {
                        item.classList.add("active");
                    }
                });

                await changeSelectOption(selectRelevantOrNearby.value);  // 還原按下的 select

                if (route.name === "Landscape") {  // 還原 景點頁 的 checkbox value
                    await changeCheckboxTicket(checkboxTicket.value);
                } else if (route.name === "Activity") {  // 還原 活動頁的 dateTime value
                    dateTime.value ? await changeDate(dateTime.value) : 0
                }

                if (categoryObj.category !== "") {  // 還原 當時有按下的篩選類別資料
                    await store.dispatch(`${route.name}/handCategoryOfSearchResultArrInit`, categoryObj);

                    elSelect.value.disabled = true;

                    if (route.name === "Landscape") {
                        elCheckbox.value.disabled = true;
                    } else if (route.name === "Activity") {
                        elInputDate.value.disabled = true;
                    }
                }
            }

             // 若不是按到按鈕 就直接離開。
            else if (e.target.nodeName !== "INPUT") return;

            // 若按下 已篩選過的同顆按鈕，就代表要看 按下 按鈕前的 所有資料。
            else if ( e.target.classList.value === "active") {
                await changeSelectOption(selectRelevantOrNearby.value);
                
                if (route.name === "Landscape") {  // 在景點頁，也要還原未篩選類別前的 select
                    await changeCheckboxTicket(checkboxTicket.value);
                } else if (route.name === "Activity") {  // 在活動頁，要還原未篩選類別前的 dateTime
                    dateTime.value ? await changeDate(dateTime.value) : 0
                }

                e.target.classList.remove("active");
                categoryObj.category = "";  // 清空類別的值
            
                // 一旦取消類別，就解開 select 的鎖定(選擇相關搜尋 或 附近搜尋)
                // 除了 在景點頁 仍按下 checkbox 或 在 活動頁 選定 dateTime 時。
                if (route.name === "Landscape" && checkboxTicket.value !== false) {
                    elSelect.value.disabled = true;
                } else if (route.name === "Activity" && dateTime.value !== "") {
                    elSelect.value.disabled = true;
                } else {
                    elSelect.value.disabled = false;
                }

                if (route.name === "Landscape") { // 在景點頁 就 解開 訂票資訊的篩選
                    elCheckbox.value.disabled = false;
                } else if (route.name === "Activity") { // 在 活動頁 就 解開 時間日期 的篩選
                    elInputDate.value.disabled = false;
                }
            }
    
            // 若原本已按下某顆類別，想切換到別的類別，就先清空所有的active屬性。
            else if (e.target.classList.value !== "active") {
                clearClass();
                
                e.target.classList.add("active");  // 並給新按下的按鈕新增active屬性。

                categoryObj.category = e.target.dataset.category;
                
                await changeSelectOption(selectRelevantOrNearby.value);

                if (route.name === "Landscape") {  // 在景點頁 要做 訂票資料篩選(如果有)
                    await changeCheckboxTicket(checkboxTicket.value);
                } else if (route.name === "Activity") {  // 在活動頁 要做 指定日期篩選(如果有)
                    dateTime.value ? await changeDate(dateTime.value) : 0
                }

                await store.dispatch(`${route.name}/handCategoryOfSearchResultArrInit`, categoryObj);
                
                // 一旦選了類別，就先鎖定 select(相關搜尋 或 附近搜尋)
                elSelect.value.disabled = true;

                if (route.name === "Landscape") {  // 在景點頁 就要順便鎖定 Checkbox
                    elCheckbox.value.disabled = true;
                } else if (route.name === "Activity") {  // 在活動頁，就要順便鎖定 Input:Date
                    elInputDate.value.disabled = true;
                }
            }

            // 最後 要記錄 該頁面，選了什麼類別
            await store.dispatch(`${route.name}/handCategoryInit`, categoryObj.category);
        }

        catch(error) {
            console.log(error);
        }
    };

    watch(() => route.name, (newRoute) => { // 若路由變化時，就要做紀錄。
        routeChange.value = true;
    });

    watch(selectRelevantOrNearby, (newOption) => {
        (routeChange.value) ? 0 : changeSelectOption(newOption)
    });

    watch(checkboxTicket, (isCheck) => {
        changeCheckboxTicket(isCheck);
    });

    watch(dateTime, (selectDate) => {
        changeDate(selectDate);
    });

    watch(storeSelectRelevantOrNearby, (storeSelectRelevantOrNearby) => {
        selectRelevantOrNearby.value = storeSelectRelevantOrNearby;
    });

    watch(storeOneCity, (storeOneCity) => {
        searchObj.oneCity = storeOneCity;
    });

    watch(storeSearchText, (storeSearchText) => {
        searchObj.searchText = storeSearchText;
    });

    watch(storeCheckboxTicket, (storeCheckboxTicket) => {
        checkboxTicket.value = storeCheckboxTicket;
    });

    watch(storeDateTime, (storeDateTime) => {
        dateTime.value = storeDateTime;
    });

    watch(storeCategory, (storeCategory) => {
        categoryObj.category = storeCategory;
    });

    watch(storeShowSearchResultArr, (storeShowSearchResultArr) => {
        // 切換到 動態分頁的時候，原本顯示的結果 會變成 undefined，因此要先判斷篩選跳過。
        if (!storeShowSearchResultArr) return 0;

        if (storeShowSearchResultArr.length === 0) {
            isOpenForNoResult.value = true;
        } else {
            isOpenForNoResult.value = false;
        }

        categoryObj.searchResultArr = storeShowSearchResultArr;
    });

    watch(storeResetFilter, (change) => {  // 重新按下搜尋按鈕後，需要一次清空所有篩選的欄位
        clearClass();

        elSelect.value.disabled = false;

        if (route.name === "Landscape") {
            elCheckbox.value.disabled = false;
        } else if (route.name === "Activity") {
            elInputDate.value.disabled = false;
        }
    });

    const init = async () => {
        try {
            // 取得目前使用者的位置資訊
            await getPosition();

            // 若偵測發現在 store 中 ShowSearchResultArr 不為空陣列，代表是切換頁面回來，
            // 因此顯示剛搜尋的結果。否則表示第一次進來該頁面，不做任何預設搜尋。
            if (storeShowSearchResultArr.value.length !== 0) {  // 以下把原本頁面資料載入回來
                selectRelevantOrNearby.value = storeSelectRelevantOrNearby.value;

                if (route.name === "Landscape") {
                    checkboxTicket.value = storeCheckboxTicket.value;
                } else if (route.name === "Activity") {
                    dateTime.value = storeDateTime.value;
                }
                
                categoryObj.category = storeCategory.value;

                filterClass("recover");
            }
        }

        catch(error) {
            console.log(error);
        }
    };

    onMounted(() => {
        init();
    });
</script>

<template>
    <div class="searchResults">
        <div class="searchResults_filter">
            <div class="searchResults_filter_header">
                <p>共有<span>{{ storeShowSearchResultArr.length }}</span>筆搜尋結果</p>

                <div class="filterBlockMobile">
                    <select v-model="selectRelevantOrNearby" ref="elSelect" class="orderMobile">
                        <option value="relevant">顯示搜尋結果</option>
                        <option value="nearby">顯示附近{{ pageDataObj.viewsName }}</option>
                    </select>

                    <div class="scrollFilterMenu" @click="toggleScrollFilter">縮小搜尋範圍</div>
                </div>
            </div>

            <div :class="['scrollFilterUnderbase', {open: isOpenScrollFilter}]"></div>

            <div :class="['scrollFilter', {open: isOpenScrollFilter}]">
                <div class="scrollFilterMenu-close" @click="toggleScrollFilter">
                    <img src="@/assets/images/searchResults/scrollFilterArrow.svg" 
                         alt="行動版篩選器關閉按鈕"
                         loadin="lazy"
                    />
                    <span>縮小搜尋範圍</span>
                </div>
            </div>
        
            <form action="#" method="post" :class="{open: isOpenScrollFilter}">
                <div class="order">
                    <h6>顯示方式</h6>

                    <select v-model="selectRelevantOrNearby" ref="elSelect">
                        <option value="relevant">顯示搜尋結果</option>
                        <option value="nearby">顯示附近{{ pageDataObj.viewsName }}</option>
                    </select>
                </div>

                <!-- 景點頁才顯示 -->
                <div class="service" v-show="route.name === 'Landscape'">
                    <h6>服務資訊</h6>

                    <ul>
                        <li>
                            <label for="ticket" :class="{checked: checkboxTicket}">
                                購票資訊
                            </label>

                            <input type="checkbox" name="service" id="ticket"   
                                   ref="elCheckbox" value="TicketInfo"
                                   v-model="checkboxTicket"
                            >
                        </li>
                    </ul>
                </div>

                <!-- 活動頁才顯示 -->
                <div class="schedule" v-show="route.name === 'Activity'">
                    <h6>指定日期</h6>

                    <input type="date" :class="{selected: dateTime}"
                           ref="elInputDate" v-model="dateTime"
                    >
                </div>

                <div class="category" ref="elCategory" @click="filterClass($event)">
                    <h6>主題類別</h6>

                    <input type="button" 
                          :data-category="pageDataObj.buttonNameOfCategory[0]"
                          :value="pageDataObj.buttonValueOfCategory[0]"
                    >

                    <input type="button" 
                          :data-category="pageDataObj.buttonNameOfCategory[1]"
                          :value="pageDataObj.buttonValueOfCategory[1]"
                    >

                    <input type="button" 
                          :data-category="pageDataObj.buttonNameOfCategory[2]"
                          :value="pageDataObj.buttonValueOfCategory[2]"
                    >

                    <input type="button" 
                          :data-category="pageDataObj.buttonNameOfCategory[3]"
                          :value="pageDataObj.buttonValueOfCategory[3]"
                    >
                </div>
            </form>
        </div>

        <ul class="searchResults_show" v-show="!isOpenForNoResult">
            <li v-for="(item) in storeShowSearchResultArr" :key="item.id">
                <router-link :to="`${route.path}/${item[pageDataObj.dynamicId]}`">
                    <img :src="item.Picture.PictureUrl1"
                         :alt="item.Picture.PictureDescription1"
                         loadin="lazy"
                    />
                    
                    <h4>{{ item[pageDataObj.searchResultsTitleName] }}</h4>

                    <div class="mapAddress">
                        <img src="@/assets/images/searchResults/mapPin.svg" 
                             alt="地圖標記圖示" class="mapPin"
                             loadin="lazy"
                        />
                        <span>{{ item.Address }}</span>
                    </div>
                </router-link>
            </li>
        </ul>

        <img v-show="isOpenForNoResult" class="noResult"
             src="@/assets/images/searchResults/noResult.svg" alt="搜尋不到"
             loadin="lazy"
        />
    </div>
</template>

<style lang="scss" scoped>
    .searchResults {
        display: flex;
        padding: 16px 10.5vw 150px;
        background-color: #FAFAFA;

        @include tablet {
            flex-direction: column;
            padding: 32px 2vw 112px;
        }

        @include mobile {
            padding: 24px 6vw 80px;
        }
    }

    .searchResults_filter {
        width: 20vw;
        margin-right: 1vw;
        padding: 8px 16px 0;

        @include tablet {
            width: 100%;
            margin: 0 0 24px 0;
            padding: 0 1vw;
        }

        @include mobile {
            padding: 0;
        }

        p {
            min-width: 273px;
            font-size: 20px;
            line-height: 29px;
            letter-spacing: 0.1em;
            color: #737373;

            @include mobile {
                margin-bottom: 16px;
                font-size: 18px;
                line-height: 26px;
            }

            span {
                margin: 0 8px;
                font-size: 28px;
                font-weight: 900;
                font-family: "Open Sans";
                line-height: 38px;
                color: #769763;
            }
        }
    }

    .searchResults_filter_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        @include tablet {
            margin-bottom: 0;
            
        }

        @include mobile {
            display: block;
        }
    }

    .filterBlockMobile {
        display: none;

        @include tablet {
            display: flex;
            align-items: center;
        }

        @include mobile {
            justify-content: space-between;
        }

        .orderMobile {  // select
            width: 21.7vw;
            margin-right: 16px;
            padding: 8px 16px;
            border: 0.5px solid #737373;
            border-radius: 5px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #737373;
            outline: 0;
            background: url("~@/assets/images/searchBar/optionArrow.svg") no-repeat right 20px center;

            @include mobile {
                width: 43vw;
            }
        }

        .scrollFilterMenu {
            display: none;

            @include tablet {
                display: block;
                padding: 8px 16px;
                border: 0.5px solid #769763;
                border-radius: 5px;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.05em;
                text-align: center;
                color: #769763;
                background-color: transparent;
            }

            @include mobile {
                width: 43vw;
            }

            &:hover {
                cursor: pointer;
                color: #FFFFFF;
                background-color: #769763;
            }
        }
    }

    .scrollFilterUnderbase {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 11;  // nav 為 10

        &.open {
            display: block;
        }
    }

    .scrollFilter {
        width: 100%;
        height: 0;
        border-radius: 20px 20px 0 0;
        transition: all 0.5s;
        background-color: #FFFFFF;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 12;  // nav 為 10

        @include tablet {
            &.open {
                height: 71vh;
                padding: 48px 9vw;
            }
        }

        @include mobile {
            &.open {
                height: 78vh;
                padding: 32px 4vw;
            }
        }
    }

    .scrollFilterMenu-close {
        display: none;

        @include tablet {
            display: flex;
            align-items: center;
        }

        img {
            margin-right: 10px;

            @include mobile {
                width: 24px;
                height: 24px;
                margin-right: 8px;
            }
        }

        span {
            font-size: 20px;
            line-height: 29px;
            letter-spacing: 0.1em;
            color: #737373;

            @include mobile {
                font-size: 18px;
                line-height: 26px;
            }
        }
    }

    form {
        @include tablet {
            display: none;

            &.open {
                position: fixed;
                top: 41vh;
                left: 9vw;
                display: flex;
                justify-content: space-between;
                width: 81vw;
                z-index: 13;
                transition: all 1s;
            }
        }

        @include mobile {
            &.open {
                display: block;
                width: 90vw;
                top: 32vh;
                left: 5vw;
            }
        }

        h6 {
            width: 100%;
            margin-bottom: 16px;
            font-size: 12px;
            line-height: 17px;
            letter-spacing: 0.05em;
            color: #ACACAC;

            @include tablet {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.15em;
            }

            @include mobile {
                font-size: 12px;
                line-height: 17px;
                letter-spacing: 0.05em;
            }
        }
    }

    .order {
        margin-bottom: 32px;

        @include tablet {
            display: none;
        }

        select {
            width: 100%;
            padding: 12px 24px;
            border: 0.5px solid #737373;
            border-radius: 5px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1em;
            color: #737373;
            outline: 0;
            background: url("~@/assets/images/searchBar/optionArrow.svg") no-repeat right 28px center;
        }
    }

    .service {
        margin-bottom: 32px;
        
        @include tablet {
            width: 38.5vw;
        }

        @include mobile {
            width: 100%;
        }

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & + li {
                margin-top: 4px;
            }
        }

        label {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #737373;

            @include tablet {  // 需同步
                font-size: 16px;
                line-height: 22px;
            }
            
            &.checked {
                color: #769763;
            }
        }

        input[type="checkbox"] {
            width: 16px;
            height: 16px;
            appearance: checkbox;

            &:checked {
                appearance: none;
                background: url("~@/assets/images/searchResults/checkboxChecked.svg");
            }
        }
    }

    .schedule {
        margin-bottom: 32px;

        @include tablet {
            width: 38.5vw;
        }

        @include mobile {
            width: 100%;
        }

        input[type="date"] {
            width: 100%;
            height: 45px;
            padding: 12px 24px;
            border: 0.5px solid #737373;
            border-radius: 5px;
            outline: 0;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1em;
            color: #737373;
            background-color: transparent;
            background: url("~@/assets/images/searchBar/optionArrow.svg") no-repeat right 28px center;

            &:hover {
                cursor: pointer;
            }

            &::-webkit-calendar-picker-indicator,
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                opacity: 0;
                appearance: none;
                -webkit-appearance: none;
                cursor: pointer;
            }
        }
    }

    .category {
        @include tablet {
            width: 38.5vw;
        }

        @include mobile {
            width: 100%;
        }

        input[type="button"] {
            width: 100%;
            padding: 8px 0;
            border-style: none;
            border: 0.5px solid #737373;
            border-radius: 5px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #737373;
            background-color: transparent;

            @include tablet {
                font-size: 16px;
                line-height: 22px;
            }

            & + input[type="button"] {
                margin-top: 8px;
            }

            &:hover {
                cursor: pointer;
                color: #FFFFFF;
                background-color: #769763;
            }

            &.active {
                color: #FFFFFF;
                background-color: #769763;
            }
        }
    }

    .searchResults_show { // ul
        width: 59vw;
        display: flex;
        flex-wrap: wrap;

        @include tablet {
            width: 100%;
        }

        li {
            width: 31.333%;
            margin: 0 1% 24px;

            @include tablet {
                width: 48%;
                margin: 0 1% 24px;
            }

            @include mobile {
                width: 100%;
                margin: 0 0 24px;
            }

            img {
                width: 100%;
                height: 22vh;
                object-fit: cover;
                border-radius: 5px;

                @include tablet {
                    height: 20vh;
                }

                @include mobile {
                    height: 25vh;
                }
            }

            h4 {
                margin: 0 0 4px 4px;
                font-size: 20px;
                line-height: 29px;
                letter-spacing: 0.1em;
                color: #737373;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    .mapAddress {
        display: flex;
        align-items: center;
        margin-left: 4px;

        .mapPin {
            width: 20px;
            height: 20px;
            align-self: flex-start;
        }

        span {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1em;
            color: #737373;
        }
    }

    .noResult {
        margin: auto auto;
    }
</style>