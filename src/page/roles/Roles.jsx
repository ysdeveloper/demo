import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Breadcrumbs, Button, Container, CssBaseline, FormControlLabel, IconButton, InputAdornment, Modal, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Pagination, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import RoleData from './RolesData';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  roleName: '',
  status: 'active', // default to 'active'
};

const validationSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
});

export default function Role() {
  const [openModel, setOpenModel] = React.useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = RoleData.filter((role) =>
    role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.active.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Typography sx={{ color: '#008099', fontSize: '24px', fontWeight: '600', letterSpacing: '1.5px' }}>Role Permission</Typography>
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
                  Add Roles
                </Button>
              </Stack>
            </Box>
          </Box>
          <Table sx={{ minWidth: 750 }} aria-label="role table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'role'}
                    direction={orderBy === 'role' ? order : 'asc'}
                    onClick={() => handleSort('role')}
                    sx={{ fontWeight: 700, fontSize: '16px' }}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'active'}
                    direction={orderBy === 'active' ? order : 'asc'}
                    onClick={() => handleSort('active')}
                    sx={{ fontWeight: 700, fontSize: '16px' }}
                  >
                    Active
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '16px', justifyContent: 'end', display: 'flex' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.active}</TableCell>
                  <TableCell>
                    <Stack justifyContent='end' direction="row" spacing={1}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
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
              <Typography sx={{ fontSize: '20px', fontWeight: '600', color: '#008099' }}>Add Role</Typography>
            </Box>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box>
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
                      sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}
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
