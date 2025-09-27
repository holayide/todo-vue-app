import { createApp } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Create Query Client instance
const queryClient = new QueryClient();

const app = createApp(App);

app.use(router);

// Provide Vue Query globally
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
