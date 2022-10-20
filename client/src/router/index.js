import { createRouter, createWebHistory } from "vue-router";
import StagesPage from "../views/StagesPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "stages",
      component: StagesPage,
    },
  ],
});

export default router;
