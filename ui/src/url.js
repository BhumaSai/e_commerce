import axios from 'axios'


export const URL = axios.create({
    baseURL: 'https://ecommercebe.onrender.com/',
    // baseURL: 'http://localhost:4000/',
    withCredentials: 'include'
})

export const IMGURL = 'https://ecommercebe.onrender.com/'
