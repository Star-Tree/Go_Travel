<script setup>
    import SearchBar from "@/components/Index/SearchBar.vue";
    import SearchResults from "@/components/Index/SearchResults.vue";
    import { onMounted } from "@vue/runtime-core";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const router = useRouter();

    onMounted(() => {
        // 可以到非首頁，代表首頁背景圖已載入過，告知最上層 App，否則重新整理時，會一直loading。
        store.dispatch("Home/handBannerImgIsLoadInit", true);

        // 每次頁面結束後，就將位置跳轉到頁面頂端。
        router.afterEach((to, from) => window.scrollTo(0, 0));
    });
</script>

<template>
    <SearchBar /> 
    <SearchResults />
</template>

<style lang="scss" scoped>

</style>