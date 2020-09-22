require("./bootstrap");

window.Vue = require("vue");
import VueRouter from "vue-router";
import Vuex from "vuex";
import { routes } from "./routes";
import StoreData from "./store";
import MainApp from "./components/MainApp.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;

    if (requiresAuth && !currentUser) {
        next("/login");
    } else if (to.path == "/login" && currentUser) {
        next("/");
    } else {
        next();
    }
});

axios.interceptors.response.use(null, error => {
    if (error.response.status == 401) {
        store.commit("logout");
        router.push("/login");
    }
    return Promise.reject(error);
});
axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${store.getters.currentUser.token}`;

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        MainApp
    }
});
