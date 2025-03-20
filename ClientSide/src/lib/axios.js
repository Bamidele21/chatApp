import axios from "axios"

const instaAxios = axios.create({
    baseURL: "https://chatapp-nanx.onrender.com/api/",
    withCredentials: true,
})

export default instaAxios