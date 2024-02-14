import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  CssBaseline,
  Box,
  Stack,
  Breadcrumbs,
  Typography,
  Link,
} from "@mui/material";

const initialValues = {
  name: "",
  mobileNumber: "",
  dateOfBirth: "",
  emailAddress: "",
  address: "",
  selector: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .nullable(),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format") // Add the matches() method here
    .required("Email address is required"),
  address: Yup.string().required("Address is required"),
  selector: Yup.string().required("Selector is required"),
});

const CreateMember = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values); // Log form data to console
    },
  });

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">Dashboard</Typography>
          <Typography color="inherit">Member-List</Typography>
          <Typography color="text.primary" sx={{ fontWeight: 700 }}>
            Create Member
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Box sx={{ mb: 2, maxWidth: "500px" }}>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                id="mobileNumber"
                label="Mobile Number"
                type="text"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("mobileNumber")}
                onKeyPress={(event) => {
                  const charCode = event.which ? event.which : event.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    event.preventDefault();
                  }
                }}
                error={
                  formik.touched.mobileNumber &&
                  Boolean(formik.errors.mobileNumber)
                }
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
                inputProps={{ maxLength: 10 }}
              />
              <TextField
                id="emailAddress"
                label="Email Address"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("emailAddress")}
                error={
                  formik.touched.emailAddress &&
                  Boolean(formik.errors.emailAddress)
                }
                helperText={
                  formik.touched.emailAddress && formik.errors.emailAddress
                }
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="address"
                label="Address"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("dateOfBirth")}
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                helperText={
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="selector"
                select
                label="Selector"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("selector")}
                error={
                  formik.touched.selector && Boolean(formik.errors.selector)
                }
                helperText={formik.touched.selector && formik.errors.selector}
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </TextField>
            </Box>
          </Box>
          <Stack spacing={2} direction="row">
            <Button
              type="button"
              variant="contained"
              onClick={formik.handleReset}
            >
              Add Family
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={formik.handleReset}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default CreateMember;
