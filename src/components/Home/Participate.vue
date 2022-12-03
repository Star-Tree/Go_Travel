<script setup>
    import { computed, onMounted, ref } from "@vue/runtime-core"
    import { useStore } from "vuex";
    import { useHandImgLoad } from "@/composition-api/index.js";

    const store = useStore();

    const isLoad = ref(false);
    
    const sotreParticipateImgArr = computed(() => store.getters["Home/participateImgArr"]);
    
    const storeParticipateImgArrIndex = computed(() => {
        return store.getters["Home/participateImgArrIndex"];
    });

    const init = () => {
        store.dispatch("Home/handParticipateImgInit").then(async(dataParticipateImg) => {
            await useHandImgLoad(dataParticipateImg);

            isLoad.value = true;
        });
    };

    onMounted(() => {
        init();
    });
</script>

<template>
    <div class="participate" v-show="isLoad">
        <img v-for="(item, index) in sotreParticipateImgArr" :key="item.id"
             v-show="index === storeParticipateImgArrIndex"
            :src="item.src" :alt="item.description" class="participatePCImg"
        >

        <div class="participate_info intro-text">
            <div class="participate_info_header">
                <h3>Participate</h3>
                <h4>體驗當地風情人文</h4>
                <p>台灣擁有豐富文俗風情，因地貌多變延伸出豐富的主題活動，邀請你體驗文化的精彩。</p>
            </div>

            <!-- v-changeImg is directive in @/main.js-->
            <ul class="participate_info_pcText">
                <li v-for="(item, index) in sotreParticipateImgArr"
                    :key="item.id" class="participate_info_pcText_li"
                >
                    <router-link :to="`/activity/${item.id}`">
                        <span v-changeImg="index">{{ item.title }}</span>  
                        <div class="smallRound"></div>
                    </router-link>
                </li>
            </ul>

            <ul class="participateMobileImg">
                <li v-for="(item) in sotreParticipateImgArr.slice(1)" :key="item.id">
                    <router-link :to="`/activity/${item.id}`" >
                        <img :src="item.src" :alt="item.description">
                        <span>{{ item.title }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .participate {
        display: flex;
        padding: 160px 0 190px;
        background-color: #FAFAFA;

        @include tablet {
            padding: 112px 0;
        }

        @include mobile {
            padding: 80px 0;
        }

        .participatePCImg {  // pc 版的圖片
            width: 52%;
            border-radius: 0 5px 5px 0;
            object-fit: cover;

            @include tablet {
                display: none;
            }
        }
    }

    .participate_info {
        width: 37%;
        margin: 0 10% 0 1%;
        padding: 0 16px;

        @include tablet {
            width: 93%;
            margin: 0 3.5%;
            padding: 0 5px 0 16px;
        }

        @include mobile {
            width: 96%;
            margin: 0 2%;
            padding: 0 8px;
        }

        h4 {
            margin-bottom: 16px;

            @include tablet {
                margin-bottom: 8px;
            }
        }

        p {
            margin-bottom: 32px;

            @include tablet {
                margin-bottom: 24px;
            }
        }

        .participate_info_pcText {  // ul
            @include tablet {
                display: none;
            }
        }
    }

    .participateMobileImg {  // ul
        display: none;

        @include tablet{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            & li:nth-child(n+3) {  // 第3張、第4張圖片
                margin-top: 16px;
            }
        }

        @include mobile {
            & li:nth-child(n+3) {  // 第3張、第4張圖片
                margin-top: 8px;
            }
        }

        li {
            width: 49%;
            position: relative;

            @include mobile {
                width: 49%;
            }
        }

        img {
            display: block;
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
            filter: brightness(70%);
            
            &:hover {
                transform: translateX(0);
            }

            @include mobile {
                height: 120px;
            }
        }

        span {
            line-height: 23px;
            letter-spacing: 0.15em;
            color: #ffff;
            position: absolute;
            top: 45%;
            left: 30%;

            @include mobile {
                display: block;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.1em;
                top: 43%;
                left: 15%;
            }
        }
    }

    .participate_info_pcText_li + li {  // li
        a {
            display: flex;
            align-items: center;
            padding: 16px 8px;
            border-bottom: 0.5px solid #769763;
        }

        span:hover {
            cursor: pointer;

            & + .smallRound {
                display: block;
            }
        }

        // 若文字被 hover 到，就讓該文字旁出現小黃點。
        .smallRound {
            display: none;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #F1D675;
        }
    }
</style>