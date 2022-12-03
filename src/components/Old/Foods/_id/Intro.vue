<script setup>
    import { computed, onMounted, ref } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const deviceWidth = ref(window.innerWidth);
    const isOpen = ref(false);

    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Foods/showDynamicPageArr"];
    });

    const detectScreen = () => deviceWidth.value = window.innerWidth;

    const changeDescription = () => isOpen.value = !isOpen.value;

    onMounted(() => {
        window.addEventListener("resize", detectScreen);
    });
</script>

<template>
    <ul class="intro">
        <li class="intro_description infoPage-text">
            <span>Description</span>
            <h4>特色簡介</h4>
            <p :class="['intro_description_detail', {open: isOpen}]" 
                v-html="storeShowDynamicPageArr.Description"
            >
            </p>

            <p :class="['continueSymbol', {open: isOpen}]">...</p>

            <div class="intro_description_pickup" @click="changeDescription">
                <h6 v-show="!isOpen">查看更多</h6>
                <img v-show="!isOpen" src="@/assets/images/_id/Intro/down_arrow.svg" alt="展開點擊圖示">


                <h6 v-show="isOpen">收起簡介</h6>
                <img v-show="isOpen" src="@/assets/images/_id/Intro/up_arrow.svg" alt="展開點擊圖示">
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    .intro {
        padding: 144px 0;

        @include tablet {
            padding: 88px 0;
        }

        li {
            width: 62.5vw;
            margin: 0 25.5vw 0 12vw;

            @include tablet {
                width: 87vw;
                margin: 0 6.5vw;
            }

            @include mobile {
                width: 84vw;
                margin: 0 8vw; 
            }
        }
    }

    .intro_description_detail {
        height: auto;

        @include mobile {
            height: 92px;
            overflow: hidden;

            &.open {
                height: auto;
            }
        }
    }

    .continueSymbol {
        display: none;

        @include mobile {
            display: block;

            &.open {
                display: none;
            }
        }
    }

    .intro_description_pickup {
        display: none;

        @include mobile {
            display: flex;
            align-items: center;
            margin-top: 16px;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>