import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/projects"
})

export const getPortfolioRequest = (token, userId) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }

    return api.get(`/${userId}`, config);
}

export const createProjectRequest = (token, project) => {
    const config = {
        headers: {
            "Authorization": token
        },
    }

    return api.post('/', project, config);
}

export const getOneProjectRequest = (token, projectId) => {
    const config = {
        headers: {
            "Authorization": token
        }
    }

    return api.get(`/project/${projectId}`, config);
}

export const updateProjectRequest = (token, project, projectId) => {
    const config = {
        headers: {
            "Authorization": token
        }
    }

    return api.put(`/${projectId}`, project, config);
}

export const deleteProjectRequest = (token, projectId) => {
    const config = {
        headers: {
            "Authorization": token
        }
    }

    return api.delete(`/${projectId}`, config);
}