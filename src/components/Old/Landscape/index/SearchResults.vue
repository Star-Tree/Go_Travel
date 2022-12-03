<script setup>
    import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const storeOneCity = computed(() => store.getters["Landscape/oneCity"]);
    const storeSearchText = computed(() => store.getters["Landscape/searchText"]);

    const storeSelectRelevantOrNearby = computed(() => {
        return store.getters["Landscape/selectRelevantOrNearby"];
    });
    
    const storeCheckboxTicket = computed(() => store.getters["Landscape/checkboxTicket"]);
    const storeCategory = computed(() => store.getters["Landscape/category"]);
    const storeResetFilter = computed(() => store.getters["Landscape/resetFilter"]);

    const storeShowSearchResultArr = computed(() => {
        return store.getters["Landscape/showSearchResultArr"];
    });

    const elSelect = ref(null);
    const elCheckbox = ref(null);
    const elCategory = ref(null);
    const selectRelevantOrNearby = ref("relevant");  // 預設是 找尋相關的結果
    const checkboxTicket = ref(false);
    const isOpenForNoResult = ref(false);
    const isOpenScrollFilter = ref(false);

    const landscapeObj = reactive({
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
                await store.dispatch("Landscape/handChangeSelectRelevantOrNearby", "nearby");

                // 切換成 附近結果的 所有資料。
                await store.dispatch("Landscape/handNearbyOfSearchResultArrInit", coordsObj);
            }

            else if (newOption === "relevant") {
                // 一切換到 relevant，就也同步改變 store中的 option
                await store.dispatch("Landscape/handChangeSelectRelevantOrNearby", "relevant");

                // 切換成 相關結果的 所有資料。
                await store.dispatch("Landscape/handShowSearchResultArrInit", landscapeObj);
            }
        }

        catch(error) {
            console.log(error);
        }
    }
    
    async function changeCheckboxTicket(isCheck) {
        try {
            // 從無勾選 -> 變到有勾選，都做 訂票資訊的篩選。
            if (isCheck) {
                await store.dispatch("Landscape/handCheckTicketInfo");

                elSelect.value.disabled = true;
            }

            // 相關結果　從 有勾選 -> 無勾選，還原 相關結果的 所有資料。
            else if (!isCheck && selectRelevantOrNearby.value === "relevant") {
                await store.dispatch("Landscape/handShowSearchResultArrInit", landscapeObj);

                elSelect.value.disabled = false;
            }

            // 附近結果 從有勾選 -> 無勾選，還原 附近結果的 所有資料
            else if (!isCheck && selectRelevantOrNearby.value === "nearby") {
                await store.dispatch("Landscape/handNearbyOfSearchResultArrInit", coordsObj);

                elSelect.value.disabled = false;
            }

            await store.dispatch("Landscape/handCheckboxTicketInit", isCheck);
        }

        catch(error) {
            console.log(error);
        }
    }

    const filterClass = async (e) => {
        try {
            if (e === "recover") {
                clearClass();

                elCategory.value.childNodes.forEach(item => {
                    if (item.dataset.category === categoryObj.category) {
                        item.classList.add("active");
                    }
                });

                await changeSelectOption(selectRelevantOrNearby.value);
                await changeCheckboxTicket(checkboxTicket.value);

                if (categoryObj.category !== "") {
                    await store.dispatch("Landscape/handCategoryOfSearchResultArrInit", categoryObj);

                    elSelect.value.disabled = true;
                    elCheckbox.value.disabled = true;
                }
            }

             // 若不是按到按鈕 就直接離開。
            else if (e.target.nodeName !== "INPUT") return;

            // 若按下 已篩選過的同顆按鈕，就代表要看 按下 按鈕前的 所有暫存資料。
            else if ( e.target.classList.value === "active") {
                await changeSelectOption(selectRelevantOrNearby.value);
                await changeCheckboxTicket(checkboxTicket.value);

                e.target.classList.remove("active");
                categoryObj.category = "";
            
                // 一旦取消類別，就解開 選擇相關搜尋 或 附近搜尋。
                if (checkboxTicket.value === false) {
                    elSelect.value.disabled = false;
                }

                // 解開訂票資訊的篩選
                elCheckbox.value.disabled = false;
            }
    
            // 若原本已按下某顆類別，想切換到別的類別，就先清空所有的active屬性。
            else if (e.target.classList.value !== "active") {
                clearClass();
                
                e.target.classList.add("active");  // 並給新按下的按鈕新增active屬性。

                categoryObj.category = e.target.dataset.category;
                
                await changeSelectOption(selectRelevantOrNearby.value);
                await changeCheckboxTicket(checkboxTicket.value);
                await store.dispatch("Landscape/handCategoryOfSearchResultArrInit", categoryObj);
                
                // 一旦選了類別，就先固定 選擇相關搜尋 或 附近搜尋 & 是否有訂票資訊。
                elSelect.value.disabled = true;
                elCheckbox.value.disabled = true;
            }

            await store.dispatch("Landscape/handCategoryInit", categoryObj.category);
        }

        catch(error) {
            console.log(error);
        }
    };

    watch(selectRelevantOrNearby, (newOption) => {
        // 如果 categoryObj.category 不等於空字串，代表要返回剛剛的搜尋結果，
        // 那就不重覆執行，否則會影響恢復搜尋結果。
        if (categoryObj.category === "") {
            changeSelectOption(newOption);
        }
    });

    watch(checkboxTicket, (isCheck) => {
        changeCheckboxTicket(isCheck);
    });

    watch(storeSelectRelevantOrNearby, (storeSelectRelevantOrNearby) => {
        selectRelevantOrNearby.value = storeSelectRelevantOrNearby;
    });

    watch(storeOneCity, (storeOneCity) => {
        landscapeObj.oneCity = storeOneCity;
    });

    watch(storeSearchText, (storeSearchText) => {
        landscapeObj.searchText = storeSearchText;
    });

    watch(storeCheckboxTicket, (storeCheckboxTicket) => {
        checkboxTicket.value = storeCheckboxTicket;
    });

    watch(storeCategory, (storeCategory) => {
        categoryObj.category = storeCategory;
    });

    watch(storeShowSearchResultArr, (storeShowSearchResultArr) => {
        if (storeShowSearchResultArr.length === 0) {
            isOpenForNoResult.value = true;
        } else {
            isOpenForNoResult.value = false;
        }

        categoryObj.searchResultArr = storeShowSearchResultArr;
    });

    watch(storeResetFilter, (change) => {
        clearClass();

        elSelect.value.disabled = false;
        elCheckbox.value.disabled = false;
    });

    const init = async () => {
        try {
            // 取得目前使用者的位置資訊
            await getPosition();

            // 若偵測發現在 store 中 ShowSearchResultArr 不為空陣列，代表是切換頁面回來，
            // 因此顯示剛搜尋的結果。否則表示第一次進來該頁面，不做任何預設搜尋。
            if (storeShowSearchResultArr.value.length !== 0) {
                selectRelevantOrNearby.value = storeSelectRelevantOrNearby.value;
                checkboxTicket.value = storeCheckboxTicket.value;
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
                        <option value="nearby">顯示附近景點</option>
                    </select>

                    <div class="scrollFilterMenu" @click="toggleScrollFilter">縮小搜尋範圍</div>
                </div>
            </div>

            <div :class="['scrollFilterUnderbase', {open: isOpenScrollFilter}]"></div>

            <div :class="['scrollFilter', {open: isOpenScrollFilter}]">
                <div class="scrollFilterMenu-close" @click="toggleScrollFilter">
                    <img src="@/assets/images/searchResults/scrollFilterArrow.svg" 
                         alt="行動版篩選器關閉按鈕"
                    >
                    <span>縮小搜尋範圍</span>
                </div>
            </div>
        
            <form action="#" method="post" :class="{open: isOpenScrollFilter}">
                <div class="order">
                    <h6>顯示方式</h6>

                    <select v-model="selectRelevantOrNearby" ref="elSelect">
                        <option value="relevant">顯示搜尋結果</option>
                        <option value="nearby">顯示附近景點</option>
                    </select>
                </div>

                <div class="service">
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

                <div class="category" ref="elCategory" @click="filterClass($event)">
                    <h6>主題類別</h6>

                    <input type="button" data-category="自然風景類" value="自然風景">

                    <input type="button" data-category="遊憩類" value="遊憩玩樂">

                    <input type="button" data-category="文化類" value="文化古蹟">

                    <input type="button" data-category="藝術類" value="藝文空間">
                </div>
            </form>
        </div>

        <ul class="searchResults_show" v-show="!isOpenForNoResult">
            <li v-for="(item) in storeShowSearchResultArr" :key="item.ScenicSpotID">
                <router-link :to="`/landscape/${ item.ScenicSpotID }`">
                    <img :src="item.Picture.PictureUrl1" 
                         :alt="item.Picture.PictureDescription1"
                    >
                    
                    <h4>{{ item.ScenicSpotName }}</h4>

                    <div class="mapAddress">
                        <img src="@/assets/images/searchResults/mapPin.svg" 
                             alt="地圖標記圖示" class="mapPin"
                        >
                        <span>{{ item.Address }}</span>
                    </div>
                </router-link>
            </li>
        </ul>

        <img v-show="isOpenForNoResult" class="noResult"
             src="@/assets/images/searchResults/noResult.svg" alt="搜尋不到"
        >
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