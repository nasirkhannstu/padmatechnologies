<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <form @submit="formSubmit">
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
                            required
                        />
                        <strong>address:</strong>
                        <input
                            type="text  "
                            class="form-control"
                            v-model="customer.address"
                            required
                        />

                        <button class="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
            <div class="card">
                <div class="card-header">All Blogs</div>

                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            customers: [],
            customer: {
                id: 0,
                name: "",
                email: "",
                password: "",
                address: ""
            },
            error: false
        };
    },
    mounted() {
        console.log("Component mounted.");
    },
    methods: {
        getCustomer() {
            axios.get("/api/customer").then(response => {
                console.log(response.data);
                this.customers = response.data.map(cus => {
                    console.log(cus.customer.address);
                    return {
                        id: cus.id,
                        name: cus.name,
                        email: cus.email,
                        password: "",
                        address: cus.customer.address
                    };
                });
                console.log("this.customers");
                console.log(this.customers);
            });
        },
        formSubmit(e) {
            e.preventDefault();
            console.log("this.customer.id");
            console.log(this.customer.id);
            if (this.customer.id !== 0) {
                this.updateBlogItem();
                return false;
            }

            let formData = new FormData();
            formData.append("name", this.customer.name);
            formData.append("email", this.customer.email);
            formData.append("password", this.customer.password);
            formData.append("address", this.customer.address);

            axios
                .post("/api/customer", formData)
                .then(response => {
                    console.log("response.data");
                    console.log(response.data);
                    customerAdd = {
                        name: response.data.user.name,
                        email: response.data.user.email,
                        password: "",
                        address: response.data.customer.address
                    };
                    this.blogs.unshift(response.data);
                    this.customer = {
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
            axios.delete("api/blog/" + id).then(response => {
                console.log(response.data);
                this.blogs = this.blogs.filter(
                    blog => blog.id != response.data
                );
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
            let formData = new FormData();
            formData.append("id", this.newBlog.id);
            formData.append("title", this.newBlog.title);
            formData.append("description", this.newBlog.description);
            formData.append("image", this.newBlog.image);

            console.log(this.newBlog);
            console.log(formData);

            axios
                .put("/api/blog/" + this.newBlog.id, this.newBlog)
                .then(response => {
                    // currentObj.success = response.data.success;
                    console.log("response.data");
                    console.log(response.data);
                    this.blogs = this.blogs.map(blog => {
                        if (blog.id == response.data.id) {
                            blog = response.data;
                            return blog;
                        }
                        return blog;
                    });
                    this.newBlog = {
                        id: 0,
                        title: "",
                        description: "",
                        image: ""
                    };
                })
                .catch(error => {
                    console.log("Error");
                });
        }
    },
    created() {
        this.getCustomer();
    }
};
</script>
