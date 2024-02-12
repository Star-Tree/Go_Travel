<script setup>
    import { ref, computed } from "@vue/runtime-core";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const route = useRoute();

    const viewsName = ref("");  // 行動版時，提示目前所處的頁面文字。
    const searchResultsTitleName = ref("");  // 搜尋結果中，每個item的標題文字。
    const isOpen = ref(false);

    const storeShowDynamicPageArr = computed(() => {
        return store.getters[`${route.name.slice(0, -2)}/showDynamicPageArr`];
    });

    const isSelected = () => isOpen.value = !isOpen.value;

    switch(route.name) {
        case "LandscapeId":
            viewsName.value = "景點";
            searchResultsTitleName.value = "ScenicSpotName";
            break;
        case "FoodsId":
            viewsName.value = "美食";
            searchResultsTitleName.value = "RestaurantName";
            break;
        case "ActivityId":
            viewsName.value = "活動";
            searchResultsTitleName.value = "ActivityName";
            break;
        case "HotelId":
            viewsName.value = "住宿";
            searchResultsTitleName.value = "HotelName";
            break;
        default:
            console.log("HomePage or not match");
    }
</script>

<template>
    <div class="header">
        <div class="header_tips">
            <span>{{ viewsName }}介紹</span>

            <div class="social">
                <a href="#" class="share">
                    <img src="@/assets/images/_id/Header/share.svg" alt="分享連結 icon" loadin="lazy" />
                    <span>分享給旅伴</span>
                </a>

                <a href="#" class="fb"></a>
                <a href="#" class="line"></a>
                <a href="#" class="link"></a>
            </div>
        </div>

        <button @click="isSelected" :class="['favoriteMobile', {selected: isOpen}]">
            <img src="@/assets/images/_id/Header/heart.svg" alt="收藏愛心 icon"
                 :class="{selected: isOpen}" loadin="lazy" 
            />
            <span>收藏{{ viewsName }}</span>
        </button>

        <div class="header_title">
            <h2>{{ storeShowDynamicPageArr[searchResultsTitleName] }}</h2>

            <button @click="isSelected" :class="['favoritePC', {selected: isOpen}]">
                <img src="@/assets/images/_id/Header/heart.svg" alt="收藏愛心 icon"
                     :class="{selected: isOpen}" loadin="lazy"
                />
                <span>收藏{{ viewsName }}</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .header {
        padding: 136px 0 96px;
        
        @include tablet {
            margin-bottom: 177px;  // 和下面的圖片 拉開間差距
            padding: 131.5px 0 32px;
        }

        @include mobile {
            margin-bottom: 122px;
            padding: 103.5px 0 32px;
        }

        .header_tips {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 11vw 86px 12vw;

            @include tablet {
                margin: 0 3vw 32px;
            }

            @include mobile {
                margin: 0 4vw 24px;
            }

            span {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.05em;
                color: #ACACAC;
            }
        }
    }

    .header_title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 0 10.5vw 0 12vw;

        @include tablet {
            margin: 0 5.3vw 0 3vw;
        }

        @include mobile {
            margin: 0 6vw;
        }

        h2 {
            width: 58vw;
            font-size: 48px;
            line-height: 67px;
            letter-spacing: 0.1em;
            color: #4F4F4F;

            @include tablet {
                width: 91.6vw;
                font-size: 42px;
                line-height: 61px;
            }

            @include mobile {
                width: 88vw;
                font-size: 28px;
                line-height: 41px;
                letter-spacing: 0.08em;
            }
        }
    }

    .social {
        display: flex;
        align-items: center;

        a + a {
            margin-left: 4px;

            @include tablet {
                margin-left: 8px;
            }
        }

        .fb {
            @include bgImg(44px, 44px, "~@/assets/images/_id/Header/fb.svg");
            
            @include mobile {
                display: none;
            }

            &:hover {
                @include bgImg(44px, 44px, "~@/assets/images/_id/Header/fbHover.svg");
            }
        }

        .line {
            @include bgImg(44px, 44px, "~@/assets/images/_id/Header/line.svg");

            @include mobile {
                display: none;
            }

            &:hover {
                margin: 0 8px;
                @include bgImg(32px, 32px, "~@/assets/images/_id/Header/lineHover.svg");
            }
        }

        .link {
            @include bgImg(44px, 44px, "~@/assets/images/_id/Header/link.svg");

            @include mobile {
                display: none;
            }

            &:hover {
                margin: 0 8px;
                @include bgImg(32px, 32px, "~@/assets/images/_id/Header/linkHover.svg");
            }
        }
    }

    .share {
        display: flex;
        align-items: center;
        margin-right: 16px;

        @include tablet {
            display: none;
        }

        @include mobile {
            display: flex;
            align-items: center;
            margin-right: 0;
        }

        img {
            margin-right: 4px;

            @include mobile {
                width: 28px;
                height: 28px;
            }
        }
    }

    .share:hover {
        span {
            color: #769763;
        }

        img {
            width: 24px;
            height: 24px;
            content: url("~@/assets/images/_id/Header/shareHover.svg");

            @include mobile {
                width: 28px;
                height: 28px;
            }
        }
    }

    button {  // .favoritePC .favoriteTablet
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 38px;
        border: 1px solid #769763;
        border-radius: 5px;
        background-color: white;
        color: #769763;
        -webkit-appearance: none;

        @include tablet {
            padding: 4px 24px;
        }

        span {
            line-height: 23px;
            letter-spacing: 0.05em;
        }

        &:hover {
            background-color: #769763;
            color: #FFFFFF;
            cursor: pointer;

            img {
                content: url("~@/assets/images/_id/Header/heartHover.svg");
            }
        }

        &.selected {
            background-color: #769763;
            color: #FFFFFF;
            cursor: pointer;
        }
        
        img {
            margin-right: 10px;
        }

        img.selected {
            content: url("~@/assets/images/_id/Header/cancel.svg");
        }
    }

    .favoritePC {
        @include tablet {
            display: none;
        }
    }

    .favoriteMobile {
        display: none;

        @include tablet {
            display: flex;
            margin: 0 3vw 8px auto;
        }

        @include mobile {
            margin: 0 3vw 8px auto;
            padding: 4px 12px;
        }

        span {
            @include mobile {
                font-size: 12px;
                line-height: 17px;
                letter-spacing: 0.1em;
            }
        }
    }
</style>