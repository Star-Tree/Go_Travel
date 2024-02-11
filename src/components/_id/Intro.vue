<script setup>
    import { computed, onMounted, ref } from "@vue/runtime-core";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const route = useRoute();

    const description = ref("");
    const descriptionTitle = ref("");
    const deviceWidth = ref(window.innerWidth);
    const isOpen = ref(false);

    const storeShowDynamicPageArr = computed(() => {
        return store.getters[`${route.name.slice(0, -2)}/showDynamicPageArr`];
    });

    const detectScreen = () => deviceWidth.value = window.innerWidth;
    const changeDescription = () => isOpen.value = !isOpen.value;

    switch(route.name) {
        case "LandscapeId":
            description.value = "DescriptionDetail";
            descriptionTitle.value = "特色簡介";
            break;
        case "FoodsId":
            description.value = "Description";
            descriptionTitle.value = "特色簡介";
            break;
        case "ActivityId":
            description.value = "Description";
            descriptionTitle.value = "活動簡介";
            break;
        case "HotelId":
            description.value = "Description";
            descriptionTitle.value = "旅館簡介";
            break;
        default:
            console.log("HomePage or not match");
    }

    onMounted(() => {
        window.addEventListener("resize", detectScreen);
    });
</script>

<template>
    <ul class="intro">
        <li class="intro_description infoPage-text">
            <span>Description</span>
            <h4>{{ descriptionTitle }}</h4>
            <p :class="['intro_description_detail', {open: isOpen}]" 
                v-html="storeShowDynamicPageArr[description]"
            >
            </p>

            <p :class="['continueSymbol', {open: isOpen}]">...</p>

            <div class="intro_description_pickup" @click="changeDescription">
                <h6 v-show="!isOpen">查看更多</h6>
                <img v-show="!isOpen" src="@/assets/images/_id/Intro/down_arrow.svg" alt="展開點擊圖示" loadin="lazy" />


                <h6 v-show="isOpen">收起簡介</h6>
                <img v-show="isOpen" src="@/assets/images/_id/Intro/up_arrow.svg" alt="展開點擊圖示" loadin="lazy" />
            </div>
        </li>

        <li v-if="route.name === 'LandscapeId'" class="infoPage-text">
            <span>Ticket Price</span>
            <h4>票價資訊</h4>
            <p v-html="storeShowDynamicPageArr.TicketInfo"></p>
        </li>

        <li v-else-if="route.name === 'ActivityId'" class="infoPage-text">
            <span>Location</span>
            <h4>活動地點</h4>
            <p>
                {{ storeShowDynamicPageArr.Address + " / "}}
                {{ storeShowDynamicPageArr.Location }}
            </p>
        </li>

        <li v-else-if="route.name === 'HotelId'" class="infoPage-text">
            <span>Spec Price</span>
            <h4>房型資訊</h4>
            <p v-html="storeShowDynamicPageArr.Spec"></p>
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

        .intro_description {
            margin-bottom: 96px;

            @include mobile {
                margin-bottom: 80px;
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