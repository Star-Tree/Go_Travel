<script setup>
    import { computed, onMounted, ref, watch } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const oneCity = ref("");  // select 動態綁定的 option 值
    const searchText = ref("");  // 關鍵字-搜尋文字

    // storeAllCityArr 為 select-option 取得台灣各縣市.
    const storeAllCityArr = computed(() => store.getters["Hotel/allCityArr"]);
    const storeOneCity = computed(() => store.getters["Hotel/oneCity"]);
    const storeSearchText = computed(() => store.getters["Hotel/searchText"]);

    const handSearch = () => {
        let hotelObj = {};

        hotelObj.searchText = searchText.value;
        hotelObj.oneCity = oneCity.value;

        store.dispatch("Hotel/handShowSearchResultArrInit", hotelObj);
        store.dispatch("Hotel/handChangeSelectRelevantOrNearby", "relevant");
        store.dispatch("Hotel/handCategoryInit", "");
        store.dispatch("Hotel/handResetFilterInit");
    };

    watch(searchText, (searchText) => {
        // 同步改變 store 的 搜尋文字
        store.dispatch("Hotel/handSearchTextInit", searchText);
    });

    watch(oneCity, (oneCity) => {
        // 同步改變 store 的 城市文字。
        store.dispatch("Hotel/handOneCityInit", oneCity);
    });

    const init = async () => {
        // 指派 select-option 放入 台灣各縣市
        await store.dispatch("Hotel/handAllCityArrInit");

        searchText.value = storeSearchText.value;
        oneCity.value = storeOneCity.value;
    };

    onMounted(() => {
        init();
    });
</script>

<template>
    <div class="searchBar">
        <span class="searchBar_pageTipsMobile">住宿頁 / 搜尋結果</span>

        <h3>你目前正在搜尋</h3>

        <form action="#" method="post" class="searchBar_main">
            <input type="search" name="searchCity" placeholder="請輸入關鍵字" 
                   class="searchKeyword" v-model.trim="searchText"
            >

            <select v-model="oneCity" class="selectCity">
                <option value="">不分縣市</option>

                <option v-for="(item) in storeAllCityArr"
                        :key="item.chName"
                        :value="item.enName"
                >
                    {{ item.chName }}
                </option>
            </select>
            
            <button @click.prevent="handSearch()">
                <img src="~@/assets/images/searchBar/search.svg" alt="搜尋圖示">
                <span>搜尋</span>
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    .searchBar {
        display: flex;
        padding: 150px 10.5vw 80px 11.5vw;

        @include tablet {
            flex-direction: column;
            padding: 116px 4vw 72px;
        }

        @include mobile {
            padding: 114px 6vw 72px;
        }

        .searchBar_pageTipsMobile {
            display: none;
            margin-bottom: 4px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #ACACAC;

            @include tablet {
                display: block;
            }

            @include mobile {
                margin-bottom: 0;
            }
        }

        h3 {
            font-size: 28px;
            line-height: 41px;
            letter-spacing: 0.08em;
            color: #737373;

            @include tablet {
                margin-bottom: 12px;
            }

            @include mobile {
                margin-bottom: 16px;
            }
        }
    }

    .searchBar_main {  // form
        display: flex;
        justify-content: space-between;
        width: 59vw;
        margin-left: 1vw;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #ACACAC;

        @include tablet {
            width: 100%;
            margin-left: 0;
        }

        .searchKeyword {  // input:search
            width: 24vw;
            margin-right: 2vw;
            padding: 13px 16px;
            border: 0.5px solid #737373;
            border-radius: 5px;
            outline: 0;

            @include tablet {
                width: 38vw;
            }

            @include mobile {
                width: 40%;
                margin-right: 0;
            }
        }

        .selectCity {  // select
            width: 24vw;
            padding: 13px 16px;
            border: 0.5px solid #737373;
            border-radius: 5px;
            color: #737373;
            outline: 0;
            background: url("~@/assets/images/searchBar/optionArrow.svg") no-repeat right 20px center;

            @include tablet {
                width: 38vw;
            }

            @include mobile {
                width: 40%;
            }
        }

        button {
            margin-left: 2vw;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            background-color: #A1B893;
            border-style: none;

            @include tablet {
                padding: 14px 16px;
            }

            @include mobile {
                margin: 0;
            }
            
            &:hover {
                cursor: pointer;
                background-color: #769763;
            }

            img {
                display: inline-block;
                margin-right: 5px;

                @include mobile {
                    margin-right: 0;
                }
            }

            span {
                font-family: "Open Sans";
                font-size: 14px;
                line-height: 19px;
                letter-spacing: 0.05em;
                color: #FFFFFF;

                @include mobile {
                    display: none;
                }
            }
        }
    }
</style>