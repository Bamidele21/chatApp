import axios from "axios"

const instaAxios = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export default instaAxios