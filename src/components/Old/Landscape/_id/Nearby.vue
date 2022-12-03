<script setup>
    import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const deviceWidth = ref(window.innerWidth);

    const coordsObj = reactive({
        latitude: 0,
        longitude: 0,
        currentId: "",
    });

    const detectScreen = () => deviceWidth.value = window.innerWidth;

    // 取得 現在動態分頁中的 主要項目的位置(可能是景點、美食、活動、旅館)
    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Landscape/showDynamicPageArr"];
    });

    const storeNearbyOfShowDynamicPageArr = computed(() => {
        if (deviceWidth.value <= 1024 && deviceWidth.value > 767) {  // 平板就只給2個地點
            return store.getters["Landscape/nearbyOfShowDynamicPageArr"].filter((item, index) => {
                return index <= 1;
            });
        } else {
            return store.getters["Landscape/nearbyOfShowDynamicPageArr"];
        }
    });

    const init = () => {
        coordsObj.latitude = storeShowDynamicPageArr.value["Position"]["PositionLat"];
        coordsObj.longitude = storeShowDynamicPageArr.value["Position"]["PositionLon"];
        coordsObj.currentId = storeShowDynamicPageArr.value.ScenicSpotID;

        store.dispatch("Landscape/handNearbyOfShowDynamicPageArrInit", coordsObj);
    };

    onMounted(() => {
        watch(() => storeShowDynamicPageArr.value["Position"], (newVal) => {
            init();
        });

        window.addEventListener("resize", detectScreen);
    });
</script>

<template>
    <div class="nearby">
        <div class="infoPage-text">
            <span>Nearby</span>
            <h4>附近景點</h4>
        </div>

        <ul>
            <li v-for="(item) in storeNearbyOfShowDynamicPageArr" 
                :key="item.ScenicSpotID"
            >
                <router-link :to="`/landscape/${ item.ScenicSpotID }`">
                    <img :src="item.Picture.PictureUrl1" 
                         :alt="item.Picture.PictureDescription1"
                    >
                    <h5>{{ item.ScenicSpotName }}</h5>
                    <p>{{ item.DescriptionDetail }}</p>
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