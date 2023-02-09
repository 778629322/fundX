import { createApp } from "vue";
import "./static/css/reset.css";
import "./static/css/common.css";
import entry from './view/App.vue'
import router from "./script/router";

const App = createApp(entry);
App.use(router)
App.mount("#app");