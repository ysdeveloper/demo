import React from 'react'
import { Box, Typography } from '@mui/material'
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import NotFound from '../Error/NoteFound';

const userRoles = {
    ADMIN: 'admin',
    USER: 'user',
};


const Dashboard = () => {
    const userRole = userRoles.USER
    return (
        <>
            {userRole === userRoles.ADMIN ? <AdminDashboard /> : userRole === userRoles.USER ? <UserDashboard /> : <NotFound />}
        </>
    )
}

export default Dashboard