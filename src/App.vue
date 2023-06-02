<script setup>
    import Nav from "@/components/Nav.vue";
    import Footer from "@/components/Footer.vue";
    import { useStore } from "vuex";
    import { computed } from "@vue/runtime-core";
    
    const store = useStore(); 

    const storeBannerImgIsLoad = computed(() => store.getters["Home/bannerImgIsLoad"]);
    const storeMobileMenuIsOpen = computed(() => store.getters["Home/mobileMenuIsOpen"]);

    const toggleMobileMenu = () => store.dispatch("Home/handMobileMenuIsOpenInit");
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
    <div v-show="storeBannerImgIsLoad" :class="['wrap', {open: storeMobileMenuIsOpen}]">
        <div class="main">
            <Nav />
            <router-view />
            <Footer />
            <div @click="scrollTop" class="arrowTop" title="移動到最上方"></div>
        </div>

        <div class="offCanvas">
            <ul class="offCanvas_menu">
                <li>
                    <router-link to="/landscape" @click="toggleMobileMenu">
                        <span>LANDSCAPE</span>找景點
                    </router-link>
                </li>

                <li>
                    <router-link to="/foods" @click="toggleMobileMenu">
                        <span>FOODS</span>找美食
                    </router-link>
                </li>

                <li>
                    <router-link to="/activity" @click="toggleMobileMenu">
                        <span>ACTIVITY</span>找活動
                    </router-link>
                </li>

                <li>
                    <router-link to="/hotel" @click="toggleMobileMenu">
                        <span>HOTEL</span>找住宿
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <div v-show="!storeBannerImgIsLoad" class="loading">
        <img src="@/assets/images/loading.gif" alt="loading 動態圖">
    </div>
</template>

<style lang="scss">
    // * {
    //     outline: 1px solid;
    // }

    .main {
        width: 100%;
    }
    
    .arrowTop {
        @include bgImg(48px, 48px, "~@/assets/images/arrowTop.png");
        position: fixed;
        right: 1%;
        bottom: 2%;

        @include tablet {
            @include bgImg(24px, 24px, "~@/assets/images/arrowTop.png");
            right: 0.5%;
            bottom: 2.5%;
        }

        @include mobile {
            right: 1%;
            bottom: 5%;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .loading {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @include off-canvas(#737373, rgba(255, 255, 255, 0.95), #769763);
</style>