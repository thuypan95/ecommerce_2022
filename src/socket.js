import { io } from 'socket.io-client';
import { baseURL } from './api';
// const data = JSON.parse(localStorage.getItem('persist:root'));
// const dataAuth = JSON.parse(data?.auth);
// const token = dataAuth?.token;
export const socket = io.connect(baseURL, {
    // extraHeaders: {
    //     Authorization: `Bearer ${token}`
    // },
    // auth: {
    //     token: token
    // }
});