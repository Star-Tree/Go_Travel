<script setup>
    import { computed } from '@vue/reactivity';
    import { useStore } from 'vuex';

    const store = useStore();

    const toggleMobileMenu = () => store.dispatch("Home/handMobileMenuIsOpenInit");
    
    const storeMobileMenuIsOpen = computed(() => store.getters["Home/mobileMenuIsOpen"]);
</script>

<template>
    <div class="nav">
        <h1>
            <router-link to="/" class="logo"
                         title="台灣觀光指南 | Travel 首頁">台灣觀光指南 | Travel 首頁
            </router-link>
        </h1>

        <ul class="nav_menu">
            <li>
                <router-link to="/landscape">
                    <h3>找景點</h3>
                    <span>LANDSCAPE</span>
                </router-link>
            </li>

            <li>
                <router-link to="/foods">
                    <h3>找美食</h3>
                    <span>FOODS</span>
                </router-link>
            </li>

            <li>
                <router-link to="/activity">
                    <h3>找活動</h3>
                    <span>ACTIVITY</span>
                </router-link>
            </li>

            <li>
                <router-link to="/hotel">
                    <h3>找住宿</h3>
                    <span>HOTEL</span>
                </router-link>
            </li>
        </ul>

        <a href="javascript:;" @click="toggleMobileMenu"
           :class="['mobileMenu', {open: storeMobileMenuIsOpen}]"
        >
        </a>
    </div>
</template>

<style lang="scss" scoped>
    .nav {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 150px;
        background: rgba(255, 255, 255, 0.9);
        position: fixed;
        left: 0;  // 從整個 body 最左邊開始
        z-index: 10;

        @include tablet {  // 平板
            height: 60px;
            justify-content: center;
            padding: 0;
        }

        @include mobile {  // 手機板
            height: 52px;
        }

        .nav_menu {  // ul
            display: flex;
            align-items: center;

            @include tablet {
                display: none;
            }
        }
    }

    h1 {
        .logo {  // h1 a
            @include logo(178px, 96px, "~@/assets/images/logo.svg");

            @include tablet {
                @include logo(112px, 60px, "~@/assets/images/logo.svg");
            }

            @include mobile {
                @include logo(97px, 52px, "~@/assets/images/logo.svg");
            }
        }
    }

    li {
        width: 82px;
        
        & + li {
            margin-left: 32px;
        }

        a {
            padding-bottom: 5px;
            border-bottom: 3px solid transparent;
            color: #737373;
            text-align: center;

            &:hover {
                border-bottom: 3px solid #F1D675;
                color: #769763;
            }

            h3 {
                line-height: 22px;
                letter-spacing: 0.05em;
            }

            span {
                font-size: 12px;
                font-family: 'Open Sans';
                line-height: 17px;
                letter-spacing: 0.1em;
            }

            &.router-link-active {
                border-bottom: 3px solid #F1D675;
                color: #769763; 
            }
        }
    }
</style>