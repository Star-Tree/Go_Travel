<script setup>
    import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const route = useRoute();

    const deviceWidth = ref(window.innerWidth);

    // 該動態分頁 物件資訊本身的位置資訊 & id編號(可能是 景點、美食、活動、旅館)
    const coordsObj = reactive({
        latitude: 0,
        longitude: 0,
        currentId: "",
    });

    // 頁面本身提供的資料屬性
    const pageDataObj = reactive({
        viewsName: "",  // 行動版時，提示目前所處的頁面文字。
        dynamicId: "",  // 動態id 名稱。
        searchResultsTitleName: "", // 搜尋結果的標題名稱
        searchResultsDescription: "", // 搜尋結果的內容描述
        indexRoute: "",  // 各頁面的主要路由名稱(ex: /landscape、 /foods)
    });

    // 取得 現在動態分頁中的 主要項目的位置(可能是景點、美食、活動、旅館)
    const storeShowDynamicPageArr = computed(() => {
        return store.getters[`${route.name.slice(0, -2)}/showDynamicPageArr`];
    });

    const storeNearbyOfShowDynamicPageArr = computed(() => {
        if (deviceWidth.value <= 1024 && deviceWidth.value > 767) {  // 平板就只給2個地點
            return store.getters[`${route.name.slice(0, -2)}/nearbyOfShowDynamicPageArr`].filter((item, index) => index <= 1 );
        } else {
            return store.getters[`${route.name.slice(0, -2)}/nearbyOfShowDynamicPageArr`];
        }
    });

    const detectScreen = () => deviceWidth.value = window.innerWidth;

    switch(route.name) {
        case "LandscapeId":
            pageDataObj.viewsName = "景點";
            pageDataObj.dynamicId = "ScenicSpotID";
            pageDataObj.searchResultsTitleName = "ScenicSpotName";
            pageDataObj.searchResultsDescription = "DescriptionDetail";
            pageDataObj.indexRoute = "/landscape";

            break;
        case "FoodsId":
            pageDataObj.viewsName = "美食";
            pageDataObj.dynamicId = "RestaurantID";
            pageDataObj.searchResultsTitleName = "RestaurantName";
            pageDataObj.searchResultsDescription = "Description";
            pageDataObj.indexRoute = "/foods";

            break;
        case "ActivityId":
            pageDataObj.viewsName = "活動";
            pageDataObj.dynamicId = "ActivityID";
            pageDataObj.searchResultsTitleName = "ActivityName";
            pageDataObj.searchResultsDescription = "Description";
            pageDataObj.indexRoute = "/activity";

            break;
        case "HotelId":
            pageDataObj.viewsName = "住宿";
            pageDataObj.dynamicId = "HotelID";
            pageDataObj.searchResultsTitleName = "HotelName";
            pageDataObj.searchResultsDescription = "Description";
            pageDataObj.indexRoute = "/hotel";

            break;
        default:
            console.log("HomePage or not match");
    }

    const init = () => {
        coordsObj.latitude = storeShowDynamicPageArr.value["Position"]["PositionLat"];
        coordsObj.longitude = storeShowDynamicPageArr.value["Position"]["PositionLon"];
        coordsObj.currentId = storeShowDynamicPageArr.value[pageDataObj.dynamicId];

        store.dispatch(`${route.name.slice(0, -2)}/handNearbyOfShowDynamicPageArrInit`, coordsObj);
    };

    onMounted(() => {
        watch(() => storeShowDynamicPageArr.value, (newVal) => {
            // 若值為undefined 代表切換到其它主頁面(index.vue)，那就不畫。
            (newVal) ? init() : 0 
        });

        window.addEventListener("resize", detectScreen);
    });
</script>

<template>
    <div class="nearby">
        <div class="infoPage-text">
            <span>Nearby</span>
            <h4>附近{{ pageDataObj.viewsName }}</h4>
        </div>

        <ul>
            <li v-for="(item) in storeNearbyOfShowDynamicPageArr" :key="item.id">
                <router-link :to="`${pageDataObj.indexRoute}/${ item[pageDataObj.dynamicId] }`">
                    <img :src="item.Picture.PictureUrl1" 
                         :alt="item.Picture.PictureDescription1"
                    >
                    <h5>{{ item[pageDataObj.searchResultsTitleName] }}</h5>
                    <p>{{ item[pageDataObj.searchResultsDescription] }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .nearby {
        padding: 120px 11.5vw;

        @include tablet {
            padding: 120px 3vw;
        }

        @include mobile {
            padding: 64px 8vw 80px;
        }

        .infoPage-text {
            margin-left: 24px;

            @include mobile {
                margin-left: 0;
            }
        }
    }

    .infoPage-text h4 {
        @include horizontalLine( 86%, 4px, #E7E7E7, 0%) {
            &::before {
                width: 0;
            }

            @include tablet {
                &::after {
                    width: 80%;
                }
            }

            @media (width: 1024px) {  // iPad Pro 版型需特別支援
                &::after {
                    width: 85%;
                }
            }

            @include mobile {
                &::after {
                    width: 70%;
                }
            }
        }
    }

    ul {
        display: flex;

        @include mobile {
            flex-direction: column;

            li + li {
                margin-top: 24px;
            }
        }

        li {
            width: 31.333%;
            margin: 0 1%;

            @include tablet {
                width: 48%;
                margin: 0 1%;
            }

            @include mobile {
                width: 100%;
                margin: 0;
            }

            img {
                width: 100%;
                height: 180px;
                object-fit: cover;
                border-radius: 5px;
            }

            h5 {
                margin: 8px 0 4px;
                font-size: 20px;
                line-height: 29px;
                letter-spacing: 0.1em;
                color: #4F4F4F;
            }

            p {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.1em;
                color: #737373;
            }
        }
    }
</style>