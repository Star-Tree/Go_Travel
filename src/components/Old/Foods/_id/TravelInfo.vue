<script setup>
    import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
    import { useStore } from "vuex";
    import { Loader } from "@googlemaps/js-api-loader";

    const store = useStore();

    const elTravelInfoMap = ref(null);

    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Foods/showDynamicPageArr"];
    });

    const states = reactive({
      google: null,
      map: null,
      markers: null,
    });

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
        version: "weekly",
        libraries: ["places"],
        language: "zh-TW",
      });

      states.google = await loader.load();

      states.map = new states.google.maps.Map(elTravelInfoMap.value, {
        center: {
            lat: storeShowDynamicPageArr.value["Position"]["PositionLat"], 
            lng: storeShowDynamicPageArr.value["Position"]["PositionLon"],
        },
        zoom: 16,
        mapTypeControl: true,
        fullscreenControl: true,
      });

      states.markers = new google.maps.Marker({
        position: states.map.center,
        map: states.map,
        animation: google.maps.Animation.BOUNCE,
      });
    };

    // html元素寫完，就馬上抓 動態分頁的資料去畫地圖。
    onMounted(() => {
        watch(() => storeShowDynamicPageArr.value["Position"], (newVal) => {
            initMap();
        });
    });
</script>

<template>
    <div class="travelInfo">
        <div class="travelInfo_map" ref="elTravelInfoMap"></div>

        <ul class="travelInfo_main">
            <li class="infoPage-text">
                <span>Parking</span>
                <h4>停車建議</h4>
                <p v-html="storeShowDynamicPageArr.ParkingInfo"></p>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .travelInfo {
        padding-bottom: 148px;

        @include mobile {
            padding-bottom: 92px;
        }

        .travelInfo_map {
            width: 83vw;
            height: 460px;
            margin: 0 17vw 80px 0;
            border-radius: 0 5px 5px 0;

            @include tablet {
                width: 100vw;
                height: 360px;
                margin: 0 0 72px 0;
                border-radius: 0;
            }

            @include mobile {
                height: 320px;
            }
        }

        .travelInfo_main {  // ul
            display: flex;
            margin: 0 17vw 0 10vw;

            @include tablet {
                display: block;
                width: 86vw;
                margin: 0 7vw;
            }

            @include mobile {
                width: 82vw;
                margin: 0 9vw;
            }
        }
    }

    li {
        width: 100%;
    }

    .infoPage-text h4 {  // 選擇器-優先權 關係，需用class 增加優先權 設定才能生效。
        @include horizontalLine(85%, 4px, #E7E7E7, 0%) {
            &::before {
                width: 0%;
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
                    width: 67%;
                }
            }
        }
    }
</style>