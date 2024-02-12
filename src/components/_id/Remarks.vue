<script setup>
    import { computed, ref } from "@vue/runtime-core";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const route = useRoute();

    const enTitle = ref("");
    const chTitle = ref("");

    const storeShowDynamicPageArr = computed(() => {
        return store.getters[`${route.name.slice(0, -2)}/showDynamicPageArr`];
    });

    switch(route.name) {
        case "LandscapeId":
            enTitle.value = "Precaution";
            chTitle.value = "注意事項";
            break;
        case "FoodsId":
            enTitle.value = "Website";
            chTitle.value = "餐廳網站";
            break;
        case "ActivityId":
            enTitle.value = "Website";
            chTitle.value = "活動網站";
            break;
        case "HotelId":
            enTitle.value = "Website";
            chTitle.value = "旅館網站";
            break;
        default:
            console.log("HomePage or not match");
    }
</script>

<template>
    <div class="remarks infoPage-text">
        <div class="remarks_title">
            <span>{{ enTitle }}</span>
            <h4>{{ chTitle }}</h4>
        </div>

        <p v-if="route.name === 'LandscapeId'" v-html="storeShowDynamicPageArr.Remarks"></p>

        <a v-else :href="storeShowDynamicPageArr.WebsiteUrl">
            {{ storeShowDynamicPageArr.WebsiteUrl }}
        </a>
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

        a {
            align-self: center;
            margin-right: 17vw;
            word-break: break-all;
            -webkit-hyphens: auto;
            
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