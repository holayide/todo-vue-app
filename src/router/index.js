import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import DetailPage from "../pages/DetailPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import Login from "../pages/auth/login.vue";
import Register from "../pages/auth/register.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
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

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !token) {
    // If route requires auth but no token → redirect to login
    next("/");
  } else if ((to.path === "/" || to.path === "/register") && token) {
    // Prevent logged-in users from accessing login/register
    next("/home");
  } else {
    next();
  }
});

export default router;
