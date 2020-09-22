<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="caard-body">
                        <form @submit.prevent="authenticate">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input
                                    type="email"
                                    v-model="form.email"
                                    class="form-control"
                                    placeholder="Email"
                                />
                            </div>
                            <div class="form-group">
                                <label for="">Password</label>
                                <input
                                    type="password"
                                    v-model="form.password"
                                    class="form-control"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="form-group">
                                <input type="submit" value="Login" />
                            </div>
                            <div class="form-group bg-danger" v-if="authError">
                                <p>{{ authError }}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "../../helpers/auth";
export default {
    name: "login",
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            error: null
        };
    },
    methods: {
        authenticate() {
            this.$store.dispatch("login");

            login(this.$data.form)
                .then(res => {
                    this.$store.commit("loginSuccess", res);
                    if (this.$store.state.currentUser.role == "admin") {
                        this.$router.push({ path: "/" });
                    } else if (
                        this.$store.state.currentUser.role == "customer"
                    ) {
                        this.$router.push({ path: "/bill" });
                    }
                })
                .catch(error => {
                    this.$store.commit("loginFailed", { error });
                });
        }
    },
    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    }
};
</script>
