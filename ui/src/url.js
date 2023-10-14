import axios from 'axios'


export const URL = axios.create({
    baseURL: 'https://ecommercebe.onrender.com',
    withCredentials: true
    // baseURL: 'http://localhost:4000/',
})

export const IMGURL = 'https://ecommercebe.onrender.com/'
// export const IMGURL = 'http://localhost:4000/'
