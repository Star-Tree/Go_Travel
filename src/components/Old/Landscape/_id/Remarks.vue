<script setup>
    import { computed } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Landscape/showDynamicPageArr"];
    });
</script>

<template>
    <div class="remarks infoPage-text">
        <div class="remarks_title">
            <span>Precaution</span>
            <h4>注意事項</h4>
        </div>

        <p v-html="storeShowDynamicPageArr.Remarks"></p>
    </div>
</template>

<style lang="scss" scoped>
    .remarks {
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

        .remarks_title {
            min-width: 121px;
            margin: 0 4vw 0 10vw;

            @include tablet {
                margin: 0 6vw 0 6.5vw;
            }
            
            @include mobile {
                margin: 0 10vw 24px 8vw;
            }

            h4 {
                margin-bottom: 0;
                @include horizontalLine(0%, 0px, black, 0%);
            }
        }

        p {
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