import { getLocalUser } from "./helpers/auth";
const user = getLocalUser();

export default {
    state: {
        appName: "Padma Techno",
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    getters: {
        welcome(state) {
            return state.appName;
        },
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {
                token: payload.access_token
            });

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoading = false;
            state.currentUser = null;
        },
        updateCustomer(state, payload) {
            state.customers = payload;
        },
        addCustomer(state, payload) {
            state.customers.unshift(payload);
        },
        deleteCustomer(state, payload) {
            state.customers = state.customers.filter(cus => cus.id != payload);
        },
        editCustomer(state, payload) {
            state.customers = state.customers.map(cus => {
                if (cus.id == payload.id) {
                    cus = payload;
                    return cus;
                }
                return cus;
            });
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        },
        getCustomers(context) {
            axios.get("/api/customer").then(response => {
                console.log(response.data);
                let customers = response.data.map(cus => {
                    console.log(cus.customer.address);
                    return {
                        id: cus.id,
                        name: cus.name,
                        email: cus.email,
                        password: "",
                        address: cus.customer.address
                    };
                });
                context.commit("updateCustomer", customers);
            });
        }
    }
};
