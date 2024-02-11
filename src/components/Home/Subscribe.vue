<script setup>
    import { ref } from "@vue/reactivity";
    import Swal from "sweetalert2";

    const elForm = ref(null);

    const isSubscribeSuccess = () => {  // html5 原生表單驗證
        if (elForm.value.reportValidity()) {
            Swal.fire({
                title: '<div style="color: #769763;">恭喜成功訂閱!</div>',
                text: '期待每個月提供你新的旅行靈感',
                color: '#737373',
                imageUrl: require('@/assets/images/subscribe/subscribeSucess.svg'),
                imageWidth: '50vw',
                imageHeight: '20vw',
                imageAlt: 'subscribe is Sucess',
                showConfirmButton: false,
                showCloseButton: true,
            });
        }
    };
</script>

<template>
    <div class="subscribe">
        <img src="@/assets/images/subscribe/subscribe.svg" 
             alt="訂閱資訊旁的景點圖 新北市雙溪區不厭亭"
             loadin="lazy"
        />

        <div class="subscribe_main">
            <div class="subscribe_main_text intro-text">
                <h3>Subscribe</h3>
                <h4>每個月來場放鬆旅行</h4>
                <p>如果你願意收到每月旅遊資訊，一起感受台灣旅行的美好。</p>
            </div>

            <form action="#" method="post" ref="elForm">
                <input type="email" name="email" 
                       placeholder="youremail@example.com" required 
                />

                <input type="submit" value=" " title="送出"
                       @click.prevent="isSubscribeSuccess"
                />
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .subscribe {
        display: flex;
        padding: 160px 5%;
        background-color: #769763;

        @include tablet {
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 0 225px;
        }

        @include mobile {
            padding: 0 0 160px;
        }
    
        img {
            width: 50%;
            margin-right: 32px;
            object-fit: cover;

            @include tablet {
                width: 100%;
                height: 407px;
                margin: 0 0 32px 0;
            }

            @include mobile {
                height: 300px;
                margin: 0 0 48px 0;
            }
        }

        .subscribe_main {
            width: 45%;
            padding: 0 1vw;

            @include tablet {
                width: 93.5%;
                padding: 0 2vw;
            }

            @include mobile {
                width: 91.5%;
                padding: 0 4vw;
            }
        }
    }

    .subscribe_main_text {
        h3 {
            color: #F1D675;
        }

        h4 {
            margin-bottom: 16px;
            color: #FFFFFF;

            @include tablet {
                margin-bottom: 8px;
            }
        }

        p {
            margin-bottom: 24px;
            color: #FFFFFF;

            @include mobile {
                margin-bottom: 16px;
            }
        }
    }

    form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 30px 24px 24px;
        border: 0.5px solid rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        background-color: transparent;

        @include tablet {
            padding: 14px 30px 14px 24px;
        }

        @include mobile {
            padding: 12px 22px 12px 16px;
        }

        input:-webkit-autofill {
            background-color: transparent;
            -webkit-text-fill-color: #FFFFFF;
            box-shadow: 0 0 0 50px #769763 inset;
            -webkit-box-shadow: 0 0 0 50px #769763 inset;
        }

        input[type=email] {
            width: 80%;
            color: #FFFFFF;
            background-color: transparent;
            line-height: 23px;
            letter-spacing: 0.1em;
            border-style: none;
            outline: 0;

            @include mobile {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.05em;
            }
            

            &::placeholder {
                letter-spacing: 0.1em;
                color: #FFFFFF;

                @include mobile {
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: 0.05em;
                }
            }
        }

        input[type=submit] {
            cursor: pointer;
            @include bgImg(18px, 18px, "~@/assets/images/subscribe/send.png");
            background-color: #769763;
            border-style: none;
            outline: 0;
        }
    }
</style>