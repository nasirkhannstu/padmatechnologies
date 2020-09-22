import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import Customer from "./components/Customers.vue";
import Bill from "./components/Bill.vue";

export const routes = [
    {
        path: "/",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/customers",
        component: Customer,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/bill",
        component: Bill,
        meta: {
            requiresAuth: true
        }
    }
];
