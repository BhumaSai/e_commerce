import axios from 'axios'

export const URL = axios.create({
    baseURL: 'https://ecommercebe.onrender.com/',
    withCredentials: true
})

export const IMGURL = 'https://ecommercebe.onrender.com/'
