import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const USEREMAIL_KEY = 'name';
const TOKEN_KEY = 'token';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [name, setName] = useState<string | null>(localStorage.getItem('name'))
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    useEffect(() => {
        const localName = localStorage.getItem('name')
        const localToken = localStorage.getItem('token')
        setName(localName)
        setToken(localToken) 
    },  [])
    const isAuth = !!token;

    const Login =  (name: string, token: string) => {
        setName(name);
        setToken(token);
        localStorage.setItem(USEREMAIL_KEY, name);
        localStorage.setItem(TOKEN_KEY, token)
    }
    const Logout = () => {
        setName(null);
        setToken(null);
        localStorage.removeItem(USEREMAIL_KEY);
        localStorage.removeItem(TOKEN_KEY);
    };
    return (
        <AuthContext.Provider value={{ name, token, Login, isAuth, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
