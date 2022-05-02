import axios from "axios";
import { baseURL, domainAuth } from ".";

const authApi = {
    loginApi: (email, password) => {
        return new Promise((resolve, reject) => {
            axios
                .post(baseURL + domainAuth, {
                    identifier: email,
                    password: password,
                })
                .then(response => {
                    const data = response.data;
                    resolve({
                        id: data.user.id,
                        token: data.jwt,
                        username: data.user.username,
                        isLogin: true
                    })
                })
                .catch(error => {
                    const message = error.response.data.message[0].messages[0].message;
                    //  console.log("er", error.response.data);
                    reject(message);
                });
        })
    },
    registerApi: (email, password) => {
        let arr = email.split('@');

        return new Promise((resolve, reject) => {
            axios.post(`${baseURL + domainAuth}/register`, {
                name: arr[0],
                password: password,
                email: email,
                username: arr[0]
            })
                .then(response => {
                    const data = response.data;
                    resolve(data);
                })
                .catch(error => {
                    const message = error?.response?.data?.message[0]?.messages[0]?.message;
                    //  console.log("er", error.response.data);
                    reject(message);
                });
        })
    }
}
export default authApi;