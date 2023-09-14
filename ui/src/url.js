import axios from 'axios'


export const URL = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: 'https://ecommercebe.onrender.com/',
    withCredentials: true
})
// URL.defaults.withCredentials = true

export const IMGURL = 'https://ecommercebe.onrender.com/'
// export const IMGURL = 'http://localhost:4000/'
