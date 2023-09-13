import axios from 'axios'
axios.defaults.withCredentials = true
export const URL = axios.create({
    baseURL: 'https://ecommercebe.onrender.com/',
})

export const IMGURL = 'https://ecommercebe.onrender.com/'
// export const IMGURL = 'http://localhost:4000/'
