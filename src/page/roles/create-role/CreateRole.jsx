import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, Container, CssBaseline, Box, Stack, Breadcrumbs, Typography } from '@mui/material';

const initialValues = {
  roleName: '',
  status: 'active', // default to 'active'
};

const validationSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
});

const RoleForm = () => {
  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
          const isActive = values.status === 'active';
          const roleData = {
              roleName: values.roleName,
              isActive: isActive,
          };
          console.log('Role Data:', roleData); // Log role data to console
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
            Role-list
          </Typography>
          <Typography color="text.primary">Add Role</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                id="roleName"
                label="Role Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('roleName')}
                error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                helperText={formik.touched.roleName && formik.errors.roleName}
              />
              <RadioGroup
                aria-label="status"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Inactive"
                />
              </RadioGroup>
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

export default RoleForm;
