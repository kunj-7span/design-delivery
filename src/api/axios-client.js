import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = useAuthStore.getState().token;
//         if (!token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            console.error("Unauthorized , please login again!");

            // useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
