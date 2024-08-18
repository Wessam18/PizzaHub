import {  createContext, useContext } from 'react'
interface AuthContextType {
    name: string | null;
    token: string | null;
    Login: (name, token) => void;
    Logout: () => void;
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    name: null,
    token: null,
    Login: () => {},
    Logout: () => {},
    isAuth: false })
export const  useAuth = () => useContext(AuthContext)
