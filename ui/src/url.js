import axios from 'axios'

export const URL = axios.create({
    baseURL: 'https://ecommerceweb-h62j.onrender.com',
    withCredentials: true
})
