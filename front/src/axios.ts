import axios from "axios";

export const backInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});