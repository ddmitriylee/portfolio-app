import React, { useState } from "react"
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const UserContext = React.createContext()
export const UserProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') ?? '');

    const loginSession = (token) => {
        localStorage.clear()
        setToken(token)
        localStorage.setItem('token', token);
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
        <UserContext.Provider value = {{token, loginSession, cleanSession, isAdmin}}>
            { children }
        </UserContext.Provider>
    )
}