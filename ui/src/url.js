import axios from 'axios'


export const URL = axios.create({
    baseURL: "https://e-commerce-p7lf.onrender.com/",
    withCredentials: true
})
