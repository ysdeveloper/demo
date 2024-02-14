import React from  'react'
import {Box, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {

    const handleBack = () => {
        
    }

    return (
        <Box height="100lvs" display='flex' flexDirection='column'  alignItems='center' justifyContent="center">
            <Typography>Opps !</Typography>
            <Link to="/"> Go Back </Link>
        </Box>
    )
}

export default NotFound