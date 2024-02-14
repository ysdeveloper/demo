import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, InputAdornment, MenuItem, Select, Stack, TableSortLabel, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserData from './UserData';

export default function User() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [orderBy, setOrderBy] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const navigate = useNavigate();

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset page to 1 when changing rows per page
  };

  const filteredData = UserData.filter((member) =>
    (member.name && member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (member.mobile && member.mobile.includes(searchTerm.toLowerCase())) ||
    (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (member.active && member.active.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ color: '#008099', fontSize: '24px', fontWeight: '600', letterSpacing: '1.5px' }}>Staff Members</Typography>
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
              <Button startIcon={<AddIcon />} variant="contained" onClick={() => navigate('/create-staff')}>
                Add New Staff
              </Button>
            </Stack>
          </Box>
        </Box>
        <Table sx={{ minWidth: 750, mt: 3 }} aria-label="member table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                  sx={{ fontWeight: 700, fontSize: '16px' }}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'mobile'}
                  direction={orderBy === 'mobile' ? order : 'asc'}
                  onClick={() => handleSort('mobile')}
                  sx={{ fontWeight: 700, fontSize: '16px' }}
                >
                  Mobile Number
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleSort('email')}
                  sx={{ fontWeight: 700, fontSize: '16px' }}
                >
                  Email Address
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'amenities'}
                  direction={orderBy === 'amenities' ? order : 'asc'}
                  onClick={() => handleSort('amenities')}
                  sx={{ fontWeight: 700, fontSize: '16px' }}
                >
                  Amenities assigned
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleSort('role')}
                  sx={{ fontWeight: 700, fontSize: '16px' }}
                >
                  Role
                </TableSortLabel>
              </TableCell>


              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '16px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.mobile}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.amenities}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
          <Box sx={{display:'flex',alignItems:'center'}}>
            <Typography variant="body2">Rows per page: &nbsp;</Typography>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              // label="Rows per page"
              size="small"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </Box>
          <Box>
            <Pagination
              count={Math.ceil(sortedData.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
      </TableContainer>
    </Box>
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
