import React from 'react'
import  {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from './AuthContext'
const ProtectedRoutes = () => {
    const {isAuth} = useAuth()
    if(!isAuth)   {
        return <Navigate to="signup" replace={true}/>
    }
    return <Outlet />
}

export default ProtectedRoutes
