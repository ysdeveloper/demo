import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RouteData } from './RouteData'


// Pages //
import Login from '../page/auth/login'

const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={RouteData.login} />} />
                <Route path={RouteData.login} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AuthRoutes