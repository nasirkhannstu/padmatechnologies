<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="caard-body">
                        <h2>Welcome: {{ welcome }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "home",
    computed: {
        welcome() {
            return this.$store.getters.welcome;
        }
    }
};
</script>
