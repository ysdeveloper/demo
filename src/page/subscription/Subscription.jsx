import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container, CssBaseline, IconButton, InputAdornment, Modal, Stack, TableSortLabel, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubscriptionData from './SubscriptionData';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  subscriptionName: '',
  months: '',
};

const validationSchema = Yup.object().shape({
  subscriptionName: Yup.string().required('Subscription name is required'),
  months: Yup.number().required('Months is required').typeError('Months must be a number'),
});

export default function Subscription() {
  const [openModel, setOpenModel] = React.useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const navigate = useNavigate();
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
        console.log('Form Data:', values); // Log form data to console
    },
});

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = SubscriptionData.filter((subscription) =>
    subscription.subscription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.months.includes(searchTerm.toLowerCase())
  );

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ color: '#008099', fontSize: '24px', fontWeight: '600', letterSpacing: '1.5px' }}>Subscriptions</Typography>
            </Box>
            <Box>
              <Stack spacing={2} direction="row" alignItems="center" pt={1}>
                <TextField
                  id="search"
                  type="search"
                  label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpen}>
                  Add Subscription
                </Button>
              </Stack>
            </Box>
          </Box>
          <Table sx={{ minWidth: 750, mt: 3 }} aria-label="subscription table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'subscription'}
                    direction={orderBy === 'subscription' ? order : 'asc'}
                    onClick={() => handleSort('subscription')}
                    sx={{ fontWeight: 700, fontSize: '16px' }}
                  >
                    Subscription
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'months'}
                    direction={orderBy === 'months' ? order : 'asc'}
                    onClick={() => handleSort('months')}
                    sx={{ fontWeight: 700, fontSize: '16px' }}
                  >
                    Months
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '16px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.subscription}</TableCell>
                  <TableCell align="right">{row.months}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'end' }}>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit">
                        <BorderColorIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={Math.ceil(sortedData.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </TableContainer>
      </Box>
      <Modal
        open={openModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
         <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: '600', color: '#008099' }}>Add Subscription</Typography>
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
                                onKeyPress={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                        event.preventDefault();
                                    }
                                }}
                                error={formik.touched.months && Boolean(formik.errors.months)}
                                helperText={formik.touched.months && formik.errors.months}
                                inputProps={{ maxLength: 3 }}
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
        </Box>
      </Modal >
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}