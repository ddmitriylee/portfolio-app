import React, { useState } from "react"
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const UserContext = React.createContext()
export const UserProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') ?? '');
    const [id, setId] = useState(localStorage.getItem('id') ?? '');

    const loginSession = (token, id) => {
        localStorage.clear()
        setToken(token);
        setId(id);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
    }

    const isAdmin = () => {
        try {
            const decoded = jwtDecode(token, 'superSecretKey');
            return decoded.isAdmin;
        } catch (error) {
            return false;
        }
    }

    const cleanSession = () => {
        localStorage.clear()
        setToken(null)
    }

    return (
        <UserContext.Provider value = {{token, loginSession, cleanSession, isAdmin, id}}>
            { children }
        </UserContext.Provider>
    )
}