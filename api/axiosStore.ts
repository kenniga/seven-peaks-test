import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GUARDIAN_POST_API_URL
});

axiosInstance.interceptors.request.use((config) => {
    config.params = {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_POST_API_KEY,
        ...config.params
    };
    return config;
});

export default axiosInstance;
