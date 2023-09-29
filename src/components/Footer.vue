<script setup>

</script>

<template>
    <div class="footer">
        <div class="footer_follow">
            <span>Follow us</span>

            <a href="https://www.facebook.com/" target="_blank" 
               title="前往 Facebook 粉絲頁" class="fb">
            </a>

            <a href="https://www.instagram.com/" target="_blank" 
               title="前往 Instagram 粉絲頁" class="ig">
            </a>

            <a href="https://www.youtube.com/" target="_blank" 
               title="前往 Youtube 粉絲頁" class="yt">
            </a>
        </div>

        <p class="footer_copyright_PC">
            Source from 中華民國交通部 public transport data eXchange(TDX)<br />
            Copyright © 2022 Travel. All rights reserved. <br class="brOfMobile" />
            Design by Lola Lin, Front Developed by Rex Wang.
        </p>

        <div class="verticalLineOfMobile"></div>

        <div class="footer_language">
            <span title="前往繁體語言版網站">CH</span>
            <span title="Go to English language version">EN</span>
            <span title="日本語版に移動">JA</span>
        </div>

        <p class="footer_copyright_mobile">
            Source from 中華民國交通部 (PTX)<br />
            Copyright © 2022 Travel. All rights reserved. <br class="brOfMobile" />
            Design by Lola, Front Developed by Rex.
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px 10%;
        background-color: #FAFAFA;
        font-family: "Open Sans";

        @include tablet {
            padding: 14px 37px 14px 23px;
        }

        @include mobile {
            flex-wrap: wrap;
            padding: 17px 61px 17px 47px;
        }

        .verticalLineOfMobile {
            display: none;

            @include mobile {
                display: block;
                width: 0.5px;
                height: 30px;
                background-color: #737373;
            }
        }
    }

    .footer_follow {
        display: flex;
        align-items: center;

        span {
            margin-right: 4px;
            color: #737373;
            line-height: 23px;
            font-family: "Noto Sans TC";

            @include tablet {
                display: none;
            }
        }

        a:hover {
            filter: drop-shadow(0 0 0 black);
        }

        .fb {
            @include bgImg(44px, 44px, "~@/assets/images/footer/fb.svg");
        }

        .ig {
            @include bgImg(44px, 44px, "~@/assets/images/footer/ig.svg");
        }

        .yt {
            @include bgImg(44px, 44px, "~@/assets/images/footer/yt.svg");
        }
    }

    .footer_copyright_PC, .footer_copyright_mobile {
        width: 55.5%;
        text-align: center;
        color: #ACACAC;
        font-size: 12px;
        line-height: 16px;

        @include mobile {
            padding: 8px;
        }

        .brOfMobile {
            display: none;

            @include tablet {
                display: block;
            }
        }
    }

     .footer_copyright_PC {
        @include mobile {
            display: none;
        }
    }

    .footer_copyright_mobile {
        display: none;

        @include mobile {
            display: block;
            width: 100%;
        }
    }

    .footer_language {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-size: 14px;
            line-height: 19px;
            letter-spacing: 0.05em;
            color: #ACACAC;

            & + span {
                margin-left: 25px;
            }
            
            &:hover {
                cursor: pointer;
                color: black;
            }
        }
    }
</style>