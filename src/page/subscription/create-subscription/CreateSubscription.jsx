import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, CssBaseline, Box, Stack, Breadcrumbs, Typography } from '@mui/material';

const initialValues = {
    subscriptionName: '',
    months: '',
};

const validationSchema = Yup.object().shape({
    subscriptionName: Yup.string().required('Subscription name is required'),
    months: Yup.number().required('Months is required').typeError('Months must be a number'),
});

const CreateSubscription = () => {
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
                    <Typography color="inherit">
                    Subscription List
                    </Typography>
                    <Typography color="text.primary">Create Subscription</Typography>
                </Breadcrumbs>
            </Box>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                id="subscriptionName"
                                label="Subscription Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('subscriptionName')}
                                error={formik.touched.subscriptionName && Boolean(formik.errors.subscriptionName)}
                                helperText={formik.touched.subscriptionName && formik.errors.subscriptionName}
                            />
                            <TextField
                                id="months"
                                label="Months"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...formik.getFieldProps('months')}
                                error={formik.touched.months && Boolean(formik.errors.months)}
                                helperText={formik.touched.months && formik.errors.months}
                            />
                        </Box>
                    </Box>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button type="button" variant="outlined" onClick={formik.handleReset}>Cancel</Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
};

export default CreateSubscription;
