import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import MemberData from "./Memberdata";
import { Box, Pagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const initialRows = [
  {
    id: 1,
    fullName: "Yash 1",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 2,
    fullName: "Yash 2",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 3,
    fullName: "Yash 3",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 4,
    fullName: "Yash 4",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 5,
    fullName: "Yash 5",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 6,
    fullName: "Yash 6",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 7,
    fullName: "Yash 7",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 8,
    fullName: "Yash 8",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 9,
    fullName: "Yash 9",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 10,
    fullName: "Yash 10",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 11,
    fullName: "Yash 11 11",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 12,
    fullName: "Yash 12 12",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 13,
    fullName: "Yash 13 13",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
  {
    id: 14,
    fullName: "Yash Sathwrara 14",
    mobileNumber: "1234567890",
    emailAddress: "yash@gmail.com",
    activeMembership: "silver",
  },
];

export default function AdminMemberList() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState(initialRows);

  const columns = [
    {
      field: "fullName",
      headerName: "Member Full name",
      flex: 1,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      flex: 1,
    },
    {
      field: "activeMembership",
      headerName: "Active Membership",
      flex: 1,
    },
    {
      field: "action",
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Edit />
          <Delete />
        </div>
      ),
    },
  ];

  // React.useEffect(() => {
  //   // api fetch
  //   // const res = fetch("/api/table", {
  //   //   page: page,
  //   //   limit: rowsPerPage,
  //   // });
  //   // setRows(res);
  // }, [page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{
          page: page - 1,
          pageSize: rowsPerPage,
        }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
        hideFooter
        loading={loading}
      />

      <Pagination
        page={page}
        count={Math.ceil(rows.length / rowsPerPage)}
        onChange={(event, value) => setPage(value)}
      />
    </Box>
  );
}
