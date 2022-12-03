<script setup>
    import { computed } from "@vue/runtime-core";
    import { useStore } from "vuex";

    const store = useStore();

    const storeShowDynamicPageArr = computed(() => {
        return store.getters["Hotel/showDynamicPageArr"];
    });
</script>

<template>
    <div class="mainInfo">
        <ul>
            <li>
                <div class="mainInfo_phone">
                    <img src="@/assets/images/_id/MainInfo/contact.svg" alt="contact icon">
                    <h4>聯絡方式</h4>
                </div>
    
                <a :href="`tel:+ ${ storeShowDynamicPageArr.Phone }`">
                    <span>
                        {{ storeShowDynamicPageArr.Phone }}<br />
                        (按下可撥打電話)
                    </span>
                </a>
            </li>

            <li>
                <div class="mainInfo_address">
                    <img src="@/assets/images/_id/MainInfo/mapPin.svg" alt="mapPin icon">
                    <h4>所在地址</h4>
                </div>

                <a href="javascript:;">
                    <span v-html="storeShowDynamicPageArr.Address"></span>
                </a>
            </li>

            <li>
                <div class="mainInfo_grade">
                    <img class="grade" src="@/assets/images/_id/MainInfo/grade.png" alt="grade icon">
                    <h4>旅館星級</h4>
                </div>
            
                <a href="javascript:;">
                    <span v-html="storeShowDynamicPageArr.Grade"></span>
                </a>
            </li>
        </ul>

        <img v-if="Object.keys(storeShowDynamicPageArr).length !== 0"
            :src="storeShowDynamicPageArr.Picture.PictureUrl1" 
            :alt="`住宿描述 ${storeShowDynamicPageArr.Picture.PictureDescription1}`"
        >
    </div>
</template>

<style lang="scss" scoped>
    .mainInfo {
        display: flex;
        justify-content: space-between;
        padding: 0 0 64px 12vw;
        background-color: #F1F5EE;

        @include tablet {
            flex-direction: column-reverse;
            padding: 0 1.5vw 74px;
        }

        @include mobile {
            padding: 0 4vw 42px;
        }

        ul {
            width: 24vw;
            margin-top: 47px;
            padding-right: 3%;

            @include tablet {
                width: 97vw;
                margin-top: 72px;
                padding: 0 7vw;
            }

            @include mobile {
                width: 92vw;
                margin-top: 40px;
                padding: 0 4vw;
            }
        }

        > img {
            width: 63vw;
            height: 480px;
            object-fit: cover;
            margin-top: -64px;
            border-radius: 5px 0 0 5px;

            @include tablet {
                width: 97vw;
                height: 379px;
                margin-top: -177px;
                border-radius: 5px;
            }

            @include mobile {
                width: 92vw;
                height: 245px;
                margin-top: -122px;
            }
        }
    }

    .mainInfo_phone, .mainInfo_address, .mainInfo_grade {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        @include tablet {
            margin-bottom: 8px;
        }

        @include mobile {
            margin-bottom: 10px;
        }

        h4 {
            font-size: 16px;
            line-height: 23px;
            letter-spacing: 0.05em;
            color: #769763;

            @include tablet {
                font-size: 20px;
                line-height: 29px;
                letter-spacing: 0.1em;
            }
        }

        img {
            margin-right: 8px; 
        }

        .grade {  // 非設計稿的icon，自行抓取，需微調。
            width: 18px;
            height: 18px;
            margin: 0 8px 0 4px;
        }
    }

    li {
        & + li {
            margin-top: 40px;

            @include tablet {
                margin-top: 24px;
            }
        }

        a {
            margin-left: 32px;
        }

        span {
            font-size: 16px;
            line-height: 23px;
            letter-spacing: 0.1em;
            color: #4F4F4F;
        }
    }
</style>