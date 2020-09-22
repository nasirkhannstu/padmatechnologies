import Axios from "axios";

export function login(creadentials) {
    return new Promise((res, rej) => {
        axios
            .post("api/login", creadentials)
            .then(response => {
                res(response.data);
            })
            .catch(err => {
                rej("Wrong Credentials");
            });
    });
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
        return null;
    }
    return JSON.parse(userStr);
}
