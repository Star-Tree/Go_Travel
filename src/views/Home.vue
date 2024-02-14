<script setup>
    import Banner from "@/components/Home/Banner.vue";
    import { ref, onMounted, defineAsyncComponent } from "vue";
    import { useRouter } from "vue-router";

    const componentExplore = ref(null);
    const componentParticipate = ref(null);
    const componentEnjoy = ref(null);
    const componentSubscribe = ref(null);

    const loadedExplore = ref(false);
    const loadedParticipate = ref(false);
    const loadedEnjoy = ref(false);
    const loadedSubscribe = ref(false);

    const AsyncComponentExplore = defineAsyncComponent(() =>
        import('@/components/Home/Explore.vue')
    );

    const AsyncComponentParticipate = defineAsyncComponent(() =>
        import('@/components/Home/Participate.vue')
    );

    const AsyncComponentEnjoy = defineAsyncComponent(() =>
        import('@/components/Home/Enjoy.vue')
    );

    const AsyncComponentSubscribe = defineAsyncComponent(() =>
        import('@/components/Home/Subscribe.vue')
    );

    const router = useRouter();

    // 每次頁面結束後，就將位置跳轉到頁面頂端。
    onMounted(() => {
        router.afterEach((to, from) => window.scrollTo(0, 0));

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case componentExplore.value:
                            loadedExplore.value = true;
                            observer.unobserve(componentExplore.value);
                            observer.observe(componentParticipate.value);
                            break;

                        case componentParticipate.value:
                            loadedParticipate.value = true;
                            observer.unobserve(componentParticipate.value);
                            observer.observe(componentEnjoy.value);
                            break;

                        case componentEnjoy.value:
                            loadedEnjoy.value = true;
                            observer.unobserve(componentEnjoy.value);
                            observer.observe(componentSubscribe.value);
                            break;

                        case componentSubscribe.value:
                            loadedSubscribe.value = true;
                            observer.unobserve(componentSubscribe.value);
                            break;
                    }
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
        observer.observe(componentExplore.value);
    });
</script>

<template>
    <Banner />

    <div ref="componentExplore" class="componentExplore">
        <AsyncComponentExplore v-if="loadedExplore" />
    </div>

    <div ref="componentParticipate" class="componentParticipate">
        <AsyncComponentParticipate v-if="loadedParticipate" />
    </div>

    <div ref="componentEnjoy" class="componentEnjoy">
        <AsyncComponentEnjoy v-if="loadedEnjoy" />
    </div>

    <div ref="componentSubscribe" class="componentSubscribe">
        <AsyncComponentSubscribe v-if="loadedSubscribe" />
    </div>

</template>

<style lang="scss" scoped>
    .componentExplore, .componentParticipate, .componentEnjoy, .componentSubscribe {
        width: 100%;
        min-height: 1px;
        transition: all 1s ease-in;
    }
</style>