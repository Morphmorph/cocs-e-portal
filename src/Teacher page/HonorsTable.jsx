import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import GradeViews from '../Admin page/Views/GradeViews';


const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    align: 'center',
    render: (row, showProfileView) => (
      <Button variant="contained" color="primary" onClick={() => showProfileView(row)}>
        View
      </Button>
    ),
  },
  {
    id: 'grades',
    label: 'Grades',
    minWidth: 170,
    align: 'center',
    render: (row, showGradesView) => (
      <Button variant="contained" color="secondary" onClick={() => showGradesView(row)}>
        View
      </Button>
    ),
  },
  { id: 'remarks', label: 'Remarks', minWidth: 170, align: 'center' },
];

function createData(createdate, usertype, id, name) {
  return { createdate, usertype, id, name };
}

const rows = [
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Student', 1234567890, 'John Doe'),
  createData('03/15/2024', 'Teacher', 1234567890, 'John Doe'),
];

export default function HonorsTable({ showProfileView, showGradesView }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showGrades, setShowGrades] = useState(false); // State to manage GradeViews component visibility
  const [selectedRow, setSelectedRow] = useState(null); // State to store the selected row for GradeViews

  const handleShowGradesClick = (row) => {
    setSelectedRow(row);
    setShowGrades(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
     
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, color: '#079440', fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ borderLeft: '1px solid #ccc' }}>
                            {column.render ? (
                              column.render(row, column.id === 'grades' ? showGradesView : showProfileView)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      
    </Paper>
  );
}
