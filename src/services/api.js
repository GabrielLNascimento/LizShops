import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-liz-shops-o13z.vercel.app/',
});

export default api;
