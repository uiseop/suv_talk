import axios from "axios";

export const backInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

export const fileInstance = axios.create({
    baseURL: "https://upload.uploadcare.com",
});

fileInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";
fileInstance.defaults.headers.common["UPLOADCARE_PUB_KEY"] =
    process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY;
