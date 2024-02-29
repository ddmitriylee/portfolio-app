import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/users",
})

export const getUserData = (token) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.get(`/`, config);
}

export const getAllUsersData = (userId, token) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.get('/all', config)
}