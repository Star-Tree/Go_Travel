<script setup>
    import { computed, onMounted, ref } from "@vue/runtime-core"
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { useHandImgLoad } from "@/composition-api/index.js";

    const router = useRouter();
    const store = useStore();

    const isLoad = ref(false);

    const storeEnjoyImgArr = computed(() => store.getters["Home/enjoyImgArr"]);

    const storeEnjoyReverseImgArr = computed(() => {
        return store.getters["Home/enjoyReverseImgArr"];
    });

    const changeImg = (index, e) => {
        e.target.src = storeEnjoyReverseImgArr.value[index].src;
    };

    const recoverImg = (index, e) => {
        e.target.src = storeEnjoyImgArr.value[index].src;
    };

    const gotoFoodsDynamicPage = (RestaurantID) => {
        store.dispatch("Foods/handShowDynamicPageArrInit", RestaurantID);

        router.push({ path:`/foods/${RestaurantID}` });
    };

    const init = async () => {
        await store.dispatch("Home/handEnjoyImgInit").then(async(dataEnjoyImg) => {
            await useHandImgLoad(dataEnjoyImg);

            isLoad.value = true;  // 正面圖片載入好了，就先打開該區塊的圖片組。
        });

        store.dispatch("Home/handEnjoyReverseImgInit")
          .then((dataEnjoyReverseImg) => useHandImgLoad(dataEnjoyReverseImg));
    };

    onMounted(() => {
        init();
    });
</script>

<template>
    <div class="enjoy">
        <div class="enjoy_text intro-text">
            <div class="enjoy_text_header">
                <h3>Enjoy</h3>
                <h4>享受在地獨特風味</h4>
            </div>

            <div class="enjoy_text_content">
                <p>充斥在台灣大街小巷的在地美食，融合當地生活與文化特色，發展出各式各樣風味，從銅板小吃到精緻料理，數不清的美味讓你飽餐一頓。</p>
                <span>享受更多美味</span>
                <img src="~@/assets/images/arrow.png" alt="文字旁的箭頭">
            </div>
        </div>

        <!-- enjoy_imgContainer 內，放了2組一樣的img圖片，各7張，共14張。 -->
        <div class="enjoy_imgContainer" v-show="isLoad">
            <img v-for="(item, index) in storeEnjoyImgArr" :key="item.RestaurantID"
                :src="item.src" :alt="item.description"
                @mouseenter="changeImg(index, $event)"
                @mouseleave="recoverImg(index, $event)"
                @click="gotoFoodsDynamicPage(item.RestaurantID)"
            >

            <img v-for="(item, index) in storeEnjoyImgArr" :key="item.RestaurantID"
                :src="item.src" :alt="item.description"
                @mouseenter="changeImg(index, $event)"
                @mouseleave="recoverImg(index, $event)"
                @click="gotoFoodsDynamicPage(item.RestaurantID)"
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .enjoy {
        padding: 160px 0;
        overflow-x: hidden;

        @include tablet {
            padding: 112px 0 114px;
        }

        @include mobile {
            padding: 80px 0;
        }
    }

    .enjoy_text {
        display: flex;
        justify-content: space-between;
        margin: 0 10.5vw 40px;
        padding: 0 1vw;

        @include tablet {
            flex-wrap: wrap;
            margin: 0 3vw 16px;
        }

        @include mobile {
            margin: 0 4vw 24px;
        }

        .enjoy_text_header {
            width: 35vw;

            @include tablet {
                width: 100%;
            }
        }
    }

    .enjoy_text_content {
        width: 38vw;
        text-align: right;

        @include tablet {
            width: 100%;
            text-align: left;
        }

        h4 {
            @include tablet {
                margin-bottom: 8px;
            }
        }

        p {
            margin-bottom: 32px;
            text-align: left;

            @include mobile {
                margin-bottom: 0px;
            }
        }

        span {
            margin-bottom: 10px;

            @include tablet {
                margin-bottom: 16px;
            }
        }
    }

    .enjoy_imgContainer {
        display: flex;
        animation: moveLeftOfPC 60s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        @include tablet {
            animation: moveLeftOfMobile 60s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        img {
            width: 15%;  // 自己本身的寬度
            margin-right: 5%;
            border-radius: 5px;
            object-fit: cover;

            @include tablet {
                width: 30%;
                margin-right: 2%;
            }
            
            &:hover {
                cursor: pointer;
            }
        }

        &:hover {
            -webkit-animation-play-state: paused;
            -moz-animation-play-state: paused;
            -o-animation-play-state: paused;
            animation-play-state: paused;
        }
    }

    @keyframes moveLeftOfPC {  // 該組件的動畫，1組 img 需要跑 7 張圖，1張圖是 20% 寬。
        from {
            transform: translateX(0%);
        }

        to {
            transform: translateX( -20% * 7 );
        }
    }

    @keyframes moveLeftOfMobile {  // 該組件的動畫，1組 img 需要跑 7 張圖，1張圖是 20% 寬。
        from {
            transform: translateX(0%);
        }

        to {
            transform: translateX( -32% * 7 );
        }
    }
</style>