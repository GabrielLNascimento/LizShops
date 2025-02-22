import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-liz-shops.vercel.app/',
});

export default api;
