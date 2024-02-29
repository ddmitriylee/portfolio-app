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

export const getAllUsersData = (token) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.get('/all', config)
}

export const getUserDataById = (token, userId) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.get(`/${userId}`, config);
}

export const deleteUserById = (token, userId) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.delete(`/${userId}`, config);
}