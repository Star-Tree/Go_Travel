<script setup>
    import Header from "@/components/_id/Header.vue";
    import MainInfo from "@/components/_id/MainInfo.vue";
    import Intro from "@/components/_id/Intro.vue";
    import TravelInfo from "@/components/_id/TravelInfo.vue";
    import Remarks from "@/components/_id/Remarks.vue";
    import Nearby from "@/components/_id/Nearby.vue";
    import { useRoute, useRouter } from "vue-router";
    import { onMounted, watch } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
        store.dispatch("Home/handBannerImgIsLoadInit", true);
        store.dispatch("Activity/handShowDynamicPageArrInit", route.params.ActivityID);
 
        // 每次頁面結束後，就將位置跳轉到頁面頂端。
        router.afterEach((to, from) => window.scrollTo(0, 0));
    });

    // 用於跳轉到推薦的附近項目，由於都是同個動態分頁(id.vue)，因此 html元素不會變動，
    // 必須主動監控路由的變化，重新取得新的動態分頁資料，並打上去。
    watch(() => route.params.ActivityID, (ActivityID) => {
        if (ActivityID) {  // 回到 index.vue 就不要執行，否則會報錯。
            store.dispatch("Activity/handShowDynamicPageArrInit", ActivityID);
        }
    });
</script>

<template>
    <Header />
    <MainInfo />
    <Intro />
    <TravelInfo />
    <Remarks />
    <Nearby />
</template>

<style lang="scss" scoped>
    
</style>