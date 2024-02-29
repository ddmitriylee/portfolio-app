import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/auth'
})

export const registerRequest = (user) => api.post('/register', user);

export const loginRequest = (user) => api.post('/login', user);