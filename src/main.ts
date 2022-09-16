import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import router from "./router";
import {setupComponents} from "@/components/index";
import "virtual:svg-icons-register";
import "@/assets/styles/index.scss";

// app
const app = createApp(App);

// pinia
const pinia = createPinia();

// Setup component
setupComponents(app);

app.use(router);
app.use(pinia);
app.mount("#app");
