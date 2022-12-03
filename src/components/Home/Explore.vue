<script setup>
    import { computed, onMounted, ref } from "@vue/runtime-core";
    import { useStore } from "vuex";
    import { useHandImgLoad } from "@/composition-api/index.js";

    const store = useStore();

    const isLoad = ref(false);
    const deviceWidth = ref(window.innerWidth);

    const detectScreen = () => deviceWidth.value = window.innerWidth;

    const exploreMainImgArray = computed(() => {  // 上面那組圖片
        if (deviceWidth.value > 1024 || deviceWidth.value <= 767) {  // PC 或 手機 就給3張圖
            return store.getters["Home/exploreImgArr"].filter((item, index) => index <= 2);
        }

        else if (deviceWidth.value <= 1024 && deviceWidth.value > 767) { // 平板就給 2張圖
            return store.getters["Home/exploreImgArr"].filter((item, index) => index <= 1);
        }
    });

    const explorePureImgArray = computed(() => {  // 下面那組圖片
        if (deviceWidth.value > 1024) {
            return store.getters["Home/exploreImgArr"].filter((item, index) => {
                return (index >= 3) & (index <= 6);
            });
        }

        else if (deviceWidth.value <= 1024 && deviceWidth.value > 767) {
            return store.getters["Home/exploreImgArr"].filter((item, index) => {
                return (index >= 3) & (index <= 5);
            });
        }

        else if (deviceWidth.value <= 767) {
            return store.getters["Home/exploreImgArr"].filter((item, index) => {
                return (index >= 4) & (index <= 6);
            });
        }
    });

    const init = () => {
        store.dispatch("Home/handExploreImgInit").then(async(dataExploreImg) => {
            await useHandImgLoad(dataExploreImg);

            isLoad.value = true;
        });
    };

    onMounted(() => {
        init();

        window.addEventListener("resize", detectScreen);
    });
</script>

<template>
    <div class="explore">
        <div class="explore_main">
            <div class="explore_main_text intro-text">
                <h3>Explore</h3>

                <h4>探索台灣每個角落</h4>

                <p>台灣擁有高山峽谷及四面環海地理特性，因此擁有各種自然景致等待人們發現，無論想要來場山林陶冶身心之旅，抑或體驗歷史人文的深度旅行，都可以在台灣這片土地上踏尋不同的風采。</p>

                <span>探索更多景色</span>

                <img src="~@/assets/images/arrow.png" alt="文字旁的箭頭">
            </div>

            <ul v-show="isLoad" class="explore_main_imgBlock">
                <li v-for="(item) in exploreMainImgArray" :key="item.ScenicSpotID">
                    <router-link :to="`/landscape/${ item.ScenicSpotID }`">
                        <div class="imgContainer">
                            <img :src="item.src" :alt="item.headText">
                        </div>

                        <h5>{{ item.headText }}</h5>
                    </router-link>
                </li>
            </ul>
        </div>

        <ul v-show="isLoad" class="explore_pureImgBlock">
            <li v-for="(item) in explorePureImgArray" :key="item.ScenicSpotID">
                <router-link :to="`/landscape/${ item.ScenicSpotID }`">
                    <div class="imgContainer">
                        <img :src="item.src" :alt="item.headText">
                    </div>

                    <h5>{{ item.headText }}</h5>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .explore {
        padding: 150px 0 170px;

        @include tablet {
            padding: 112px 0;
        }

        @include mobile {
            padding: 80px 0;
        }
    }
    
    .explore_main {
        display: flex;
        margin: 0 0 40px 0;
        transform: translateX(11.5vw);

        @include tablet {
            margin-bottom: 32px;
            transform: translateX(5vw);
        }

        @include mobile {
            justify-content: center;
            flex-wrap: wrap;
            margin: 0 0 16px 0;
            transform: translateX(0vw);
        }
    }

    .explore_main_text {  // .intro-Text in module/_text.scss
        width: 40vw;
        padding-right: 1vw;

        @include tablet {
            width: 54vw;
        }

        @include mobile {
            width: 92%;
            padding-right: 0;
        }

        h4 {
            margin-bottom: 16px;

            @include tablet {
                margin-bottom: 8px;
            }
        }

        p {
            margin-bottom: 35px;

            @include tablet {
                margin-bottom: 60px;
            }

            @include mobile {
                margin-bottom: 24px;
            }
        }
    }

    .explore_main_imgBlock {
        width: 70vw;

        @include tablet {
            width: 50vw;
            transform: translateX(5vw);
        }

        @include mobile {
            width: 100%;
            transform: translateX(12vw);
        }
    }

    .explore_main_imgBlock, .explore_pureImgBlock { // ul
        display: flex;
        justify-content: center;
    }

    li {
        margin-left: 1vw;

        @include mobile {
            margin-left: 8px;
        }

        a {
            display: flex;
        }

        .imgContainer {
            overflow: hidden;
            border-radius: 5px;
        }
        
        img {
            max-width: 17vw;
            min-width: 17vw;
            height: 350px;
            object-fit: cover;

            @include tablet {
                max-width: 27vw;
                min-width: 27vw;
                min-height: 319px;
            }

            @include mobile {
                min-width: 0;
                min-height: 0;
                width: 30vw;
                height: 170px;
            }

            &:hover {
                transform: scale(1.2);
                transition: 1.5s;
            }
        }

        h5 {
            margin-left: 4px;
            color: #737373;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: 0.2em;
            writing-mode: vertical-lr;

            @include tablet {
                font-size: 14px;
                line-height: 18px;
            }

            @include mobile {
                line-height: 16px;
            }
        }
    }

    .explore_pureImgBlock {
        @include tablet {
            margin: 0 3vw;
        }

        @include mobile {
            width: 94%;
            margin: 0 6% 0 0;
            transform: translateX(-3%);
        }
    }
</style>