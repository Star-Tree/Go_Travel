<script setup>
    import { computed } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Foods/showDynamicPageArr"];
    });
</script>

<template>
    <div class="website infoPage-text">
        <div class="website_title">
            <span>Website</span>
            <h4>餐廳網站</h4>
        </div>

        <a :href="storeShowDynamicPageArr.WebsiteUrl">
            {{ storeShowDynamicPageArr.WebsiteUrl }}
        </a>
    </div>
</template>

<style lang="scss" scoped>
    .website {
        display: flex;
        padding: 64px 0;
        border-left: 16px solid #A1B893;
        background-color: #F1F5EE;

        @include tablet {
            padding: 56px 0;
            border-left: 12px solid #A1B893;
        }

        @include mobile {
            flex-direction: column;
            border-left: 8px solid #A1B893;
        }

        .website_title {
            min-width: 121px;
            margin: 0 4vw 0 10vw;

            @include tablet {
                margin: 0 6vw 0 6.5vw;
            }

            @include mobile {
                margin: 0 10vw 24px 8vw;
            }

            h4 {
                margin-bottom: 0px;
                @include horizontalLine(0%, 0px, black, 0%);
            }
        }

        a {
            align-self: center;
            margin-right: 17vw;
            
            @include tablet {
                margin-right: 6vw;
            }

            @include mobile {
                align-self: flex-start;
                margin: 0 10vw 0 8vw;
            }
        }
    }
</style>