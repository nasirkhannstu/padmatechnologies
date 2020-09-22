<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav">
                <template v-if="!currentUser">
                    <li>
                        <router-link to="/login" class="nav-link"
                            >Login</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/register" class="nav-link"
                            >Register</router-link
                        >
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link
                            v-if="this.$store.state.currentUser.role == 'admin'"
                            to="/customers"
                            class="nav-link"
                            >Customer</router-link
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            >{{ currentUser.name }} <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu">
                            <a
                                @click.prevent="logout"
                                class="dropdown-item"
                                href="#"
                                >Logout</a
                            >
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "app-header",
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/login");
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    }
};
</script>
