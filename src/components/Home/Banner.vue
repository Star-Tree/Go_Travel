<script setup>
    import { computed, onMounted, onUnmounted, ref } from "@vue/runtime-core";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { useHandImgLoad } from "@/composition-api/index.js";

    const store = useStore();
    const router = useRouter();

    const isLoad = ref(false);
    const elForm = ref(null);
    const elInputSearch = ref(null);
    const searchText = ref("");  // 搜尋文字

    const storeBannerImgArr = computed(() => store.getters["Home/bannerImgArr"]);
    const storeBannerImgArrIndex = computed(() => store.getters["Home/bannerImgArrIndex"]);

    // 設一個連續計時器，固定時間輪播下一張banner圖。
    const timer = setInterval(() => nextImg(), 5000);

    const nextImg = () => store.dispatch("Home/handNextBannerImg");
    const prevImg = () => store.dispatch("Home/handPrevBannerImg");

    const gotoPageOfLandscape = () => {
        if (elForm.value.reportValidity()) {
            let landscapeObj = {};
            landscapeObj.searchText = searchText.value;

            // 同步改變 store 的 搜尋文字(首頁-banner & 景點頁-search)
            store.dispatch("Landscape/handSearchTextInit", searchText.value);

            // 跳到景點頁時，就先秀出 對應的搜尋結果。
            store.dispatch("Landscape/handShowSearchResultArrInit", landscapeObj);

            router.push({ path:`/landscape` });
        }
    };

    const init = () => {
        store.dispatch("Home/handBannerImgInit").then(async(resBannerImg) => {
            await useHandImgLoad(resBannerImg);

            isLoad.value = true;

            await store.dispatch("Home/handBannerImgIsLoadInit", isLoad.value);

            elInputSearch.value.focus();
        });
    };

    onMounted(() => {
        init();
    });

    onUnmounted(() => {
        clearInterval(timer);
    });
</script>

<template>
    <div class="banner" v-show="isLoad">
        <img v-for="(item, index) in storeBannerImgArr" :key="item.src"
             v-show="index === storeBannerImgArrIndex"
            :src="item.src" :alt="item.description" loadin="lazy"
        >

        <div class="banner_main">
            <h2>遠離日常喧囂<br />
                讓旅行豐富你的生活
            </h2>

            <form class="banner_main_searchBlock" action="#" method="post" ref="elForm">
                <input type="search" class="search" placeholder="想去哪裡?" 
                       ref="elInputSearch" v-model.trim="searchText" required
                />

                <input type="submit" class="submit" value=" " title="按下可搜尋"
                       @click.prevent="gotoPageOfLandscape"
                />

                <a @click="nextImg()" class="nextImg" href="javascript:;" title="下一張"></a>
                <a @click="prevImg()" class="prevImg" href="javascript:;" title="上一張"></a>
            </form>
        </div>
    </div>
</template>
           
<style lang="scss" scoped>
    .banner {
        position: relative;

        img {
            width: 100%;
            min-width: 100%;
            height: 100dvh;
            min-height: 100dvh;
            object-fit: cover;

            @include tablet {
                height: 85vh;
            }
        }
    }

    .banner_main {
        width: 40%;
        position: absolute;
        top: 33.3%;
        left: 30%;

        @include tablet {
            width: 61.7%;
            left: 20%;
        }

        @include mobile {
            width: 80%;
            left: 10%;
        }

        h2 {
            margin-bottom: 24px;
            color: #FFFFFF;
            font-size: 48px;
            line-height: 70px;
            letter-spacing: 0.15em;

            @include tablet {
                margin-bottom: 18px;
                font-size: 42px;
                line-height: 61px;
            }

            @include mobile {
                margin-bottom: 16px;
                font-size: 28px;
                line-height: 41px;
            }
        }
    }

    .banner_main_searchBlock { // form
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 37px 20px 32px;
        border-radius: 5px;
        background-color: #FFFFFF;
        position: relative;

        @include tablet {
            padding: 18px 44px 18px 32px;
        }

        @include mobile {
            padding: 10px 36px 10px 24px;
        }

        .search {
            width: 98%;
            line-height: 23px;
            letter-spacing: 0.1em;
            color: black;
            background-color: #FFFFFF;
            border-style: none;
            outline: 0;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: #FFFFFF;
            
            &::placeholder {
                line-height: 23px;
                letter-spacing: 0.1em;
                color: #ACACAC;
                -webkit-appearance: none;
            }
        }

        input[type="search"]::-webkit-search-cancel-button {
            -webkit-appearance: none;
        }

        .submit {
            @include bgImg(20px, 20px, "~@/assets/images/searchBanner.svg");
            border-style: none;
            
            &:hover {
                cursor: pointer;
            }
        }

        .nextImg {
            @include bgImg(48px, 48px, "~@/assets/images/banner/next_arrow.png");
            position: absolute;
            left: 160%;

            @include tablet {
                @include bgImg(32px, 32px, "~@/assets/images/banner/next_arrow.png");
                left: 120%;
            }

            @include mobile {
                @include bgImg(16px, 16px, "~@/assets/images/banner/next_arrow.png");
                left: 105%;
            }
        }

        .prevImg {
            @include bgImg(48px, 48px, "~@/assets/images/banner/prev_arrow.png");
            position: absolute;
            right: 160%;

            @include tablet {
                @include bgImg(32px, 32px, "~@/assets/images/banner/prev_arrow.png");
                right: 120%;
            }

            @include mobile {
                @include bgImg(16px, 16px, "~@/assets/images/banner/prev_arrow.png");
                right: 105%;
            }
        }
    }
</style>