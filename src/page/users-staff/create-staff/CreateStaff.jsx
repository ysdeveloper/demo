import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, MenuItem, Container, CssBaseline, Box, Stack, Breadcrumbs, Typography, Link } from '@mui/material';
import RoleData from '../../roles/RolesData';
import { useNavigate } from 'react-router-dom';


const initialValues = {
    name: '',
    mobileNumber: '',
    dateOfBirth: '',
    emailAddress: '',
    address: '',
    roles: '',
    amenities: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .nullable(),
    dateOfBirth: Yup.string().required('Date of birth is required'),
    emailAddress: Yup.string()
        .email('Invalid email address')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address format') // Add the matches() method here
        .required('Email address is required'),
    address: Yup.string().required('Address is required'),
    roles: Yup.string().required('Role is required'),
    amenities: Yup.string().required('Amenities is required'),
});



const amenities = [
    {
        value: 'option1',
        label: 'Option 1',
    },
    {
        value: 'option2',
        label: 'Option 2',
    },
];

const CreateMember = () => {
    const navigate = useNavigate();


    const handleCancel = () => {
        formik.handleReset(); 
        navigate('/user');
    };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log('Form Data:', values); // Log form data to console
        },
    });

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="inherit">
                        Dashboard
                    </Typography>
                    <Typography
                        color="inherit"
                    >
                        Staff-List
                    </Typography>
                    <Typography color="text.primary">Create Staff/user</Typography>
                </Breadcrumbs>
            </Box>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Box sx={{ mb: 2, mr: 5 }}>
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('name')}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                id="mobileNumber"
                                label="Mobile Number"
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('mobileNumber')}
                                onKeyPress={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                        event.preventDefault();
                                    }
                                }}
                                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                inputProps={{ maxLength: 10 }}
                            />

                            <TextField
                                id="emailAddress"
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('emailAddress')}
                                error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                            />
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('address')}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                id="dateOfBirth"
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('dateOfBirth')}
                                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="roles"
                                select
                                label="Roles"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('roles')}
                                error={formik.touched.roles && Boolean(formik.errors.roles)}
                                helperText={formik.touched.roles && formik.errors.roles}
                            >
                                {RoleData.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.role}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="amenities"
                                select
                                label="Amenities"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('amenities')}
                                error={formik.touched.amenities && Boolean(formik.errors.amenities)}
                                helperText={formik.touched.amenities && formik.errors.amenities}
                            >
                                {amenities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button type="button" variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
};

export default CreateMember;
