import axios from 'axios'

export const URL = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
    // baseURL: 'https://ecommercebe.onrender.com/',

})

export const IMGURL = 'http://localhost:4000/'
