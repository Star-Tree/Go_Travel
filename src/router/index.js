import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/landscape",
    name: "Landscape",
    component: () => import("@/views/Landscape/index.vue"),
  },
  {
    path: "/landscape/:ScenicSpotID",
    name: "LandscapeId",
    component: () => import("@/views/Landscape/_id.vue"),
  },
  {
    path: "/foods",
    name: "Foods",
    component: () => import("@/views/Foods/index.vue"),
  },
  {
    path: "/foods/:RestaurantID",
    name: "FoodsId",
    component: () => import("@/views/Foods/_id.vue"),
  },
  {
    path: "/activity",
    name: "Activity",
    component: () => import("@/views/Activity/index.vue"),
  },
  {
    path: "/activity/:ActivityID",
    name: "ActivityId",
    component: () => import("@/views/Activity/_id.vue"),
  },
  {
    path: "/hotel",
    name: "Hotel",
    component: () => import("@/views/Hotel/index.vue"),
  },
  {
    path: "/hotel/:HotelID",
    name: "HotelId",
    component: () => import("@/views/Hotel/_id.vue"),
  }, 
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",  // 若是找不到對應的頁面，就自動導到首頁。
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;