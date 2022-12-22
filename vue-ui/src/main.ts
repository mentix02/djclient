import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import pinia from "@/plugins/pinia";

import "bootswatch/dist/yeti/bootstrap.min.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
