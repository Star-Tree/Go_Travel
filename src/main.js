import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.directive("changeImg", {  // in Participate.vue for index of page
    mounted(el, index) {
        el.addEventListener("mouseover", function changeImg () {  // id 值傳進來。
            store.dispatch("Home/handParticipateImgArrIndexInit", index.value);
        }),

        el.addEventListener("mouseout", function resetImg () {
            store.dispatch("Home/handParticipateImgArrIndexInit", 0);
        })
    }
});

app.use(store).use(router).mount('#app');
