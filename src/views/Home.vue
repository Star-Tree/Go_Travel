<script setup>
    import Banner from "@/components/Home/Banner.vue";
    import Explore from "@/components/Home/Explore.vue";
    import Participate from "@/components/Home/Participate.vue";
    import Enjoy from "@/components/Home/Enjoy.vue";
    import Subscribe from "@/components/Home/Subscribe.vue";
    import { onMounted } from "@vue/runtime-core";
    import { useRouter } from "vue-router";

    const router = useRouter();

    // 每次頁面結束後，就將位置跳轉到頁面頂端。
    onMounted(() => {
        router.afterEach((to, from) => window.scrollTo(0, 0));
    });
</script>

<template>
    <Banner />
    <Explore />
    <Participate />
    <Enjoy />
    <Subscribe />
</template>

<style lang="scss" scoped>

</style>