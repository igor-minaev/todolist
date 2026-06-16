import axios from "axios";


const apiKey = "a30f9853-a5e3-4468-8571-cb595f337f01"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})