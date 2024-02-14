import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const navigate = useNavigate(); 
    const [isLoginError, setIsLoginError] = useState(false); 

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
    });

    const handleSubmit = async (values, actions) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            const formData = {
                email: values.email,
                password: values.password
            };
            console.log('Form Data:', formData);

            setIsLoginError(false);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (errors) {
            actions.setErrors(errors.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {}));
            setIsLoginError(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '24px',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                fullWidth
                                variant="outlined"
                                error={errors.email && touched.email}
                                helperText={touched.email && errors.email}
                                InputProps={{
                                    startAdornment: <AccountCircle />,
                                }}
                                sx={{ mt: 3, mb: 2 }}
                            />
                            <Field
                                as={TextField}
                                type="password"
                                name="password"
                                label="Password"
                                fullWidth
                                variant="outlined"
                                error={errors.password && touched.password}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    startAdornment: <Lock />,
                                }}
                                sx={{ mt: 2, mb: 2 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >Sign in
                            </Button>
                        </Form>
                    )}
                </Formik>
                {isLoginError && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        Invalid email or password.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;
