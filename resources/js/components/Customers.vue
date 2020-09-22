<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">ADD / EDIT Customer</div>
                <div class="card-body">
                    <form @submit.prevent="formSubmit">
                        <strong>Name:</strong>
                        <input
                            type="text"
                            class="form-control"
                            v-model="customer.name"
                            required
                        />
                        <strong>Email:</strong>
                        <input
                            type="email"
                            class="form-control"
                            v-model="customer.email"
                            required
                        />
                        <strong>Password:</strong>
                        <input
                            type="password"
                            class="form-control"
                            v-model="customer.password"
                            value="123123"
                            required
                        />
                        <strong>address:</strong>
                        <input
                            type="text  "
                            class="form-control"
                            v-model="customer.address"
                            required
                        />

                        <button class="btn btn-success">
                            Create Customers
                        </button>
                    </form>
                </div>
            </div>
            <div class="card">
                <div class="card-header">All Customers</div>

                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="!customers.length">
                                <tr>
                                    <td colspan="4" class="text-center">
                                        No record found
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="cus in customers" :key="cus.id">
                                    <th scope="row">{{ cus.name }}</th>
                                    <td>{{ cus.email }}</td>
                                    <td>{{ cus.address }}</td>
                                    <td>
                                        <button
                                            @click="editItem(cus)"
                                            class="btn btn-info btn-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="deleteItem(cus.id)"
                                            class="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "customers",
    data: function() {
        return {
            customer: {
                id: 0,
                name: "",
                email: "",
                password: "",
                address: ""
            },
            error: null
        };
    },
    methods: {
        formSubmit() {
            this.error = null;

            if (this.customer.id > 0) {
                this.updateBlogItem();
                return false;
            }
            axios
                .post("/api/customer", this.customer)
                .then(response => {
                    console.log("response.data");
                    console.log(response.data);
                    console.log(response.data.user.name);
                    console.log(response.data.customer.address);
                    let customerAdd = {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        password: "",
                        address: response.data.customer.address
                    };
                    console.log(customerAdd);
                    this.$store.commit("addCustomer", customerAdd);
                    this.customer = {
                        id: 0,
                        name: "",
                        email: "",
                        password: "",
                        address: ""
                    };
                })
                .catch(error => {
                    console.log("Error");
                });
        },
        deleteItem(id) {
            axios.delete("api/customer/" + id).then(response => {
                console.log(response.data);
                this.$store.commit("deleteCustomer", id);
            });
        },
        editItem(customer) {
            console.log("Edit item");
            this.customer = {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                password: "",
                address: customer.address
            };
        },
        updateBlogItem() {
            this.error = null;
            console.log(this.customer);
            axios
                .put("/api/customer/" + this.customer.id, this.customer)
                .then(response => {
                    let customerAdd = {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        password: "",
                        address: response.data.customer.address
                    };
                    console.log(customerAdd);
                    this.$store.commit("editCustomer", customerAdd);
                    this.customer = {
                        id: 0,
                        name: "",
                        email: "",
                        password: "",
                        address: ""
                    };
                })
                .catch(error => {
                    console.log("Error");
                });
        }
    },
    computed: {
        customers() {
            return this.$store.getters.customers;
        },
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    mounted() {
        this.$store.dispatch("getCustomers");
    }
};
</script>
