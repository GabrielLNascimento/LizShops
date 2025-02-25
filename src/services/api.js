import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-users-sand.vercel.app',
});

export default api;
