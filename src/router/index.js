import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import DetailPage from "../pages/DetailPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/todo/:id",
    component: DetailPage,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
