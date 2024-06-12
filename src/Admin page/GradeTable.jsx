import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = [
  { id: 'student_id', label: 'ID No.', minWidth: 170,  },
  { id: 'student_name', label: 'Student Name', minWidth: 170,},
  {
    id: 'grades',
    label: 'Grades',
    minWidth: 170,
    align: 'center',
    render: (row, handleOpen) => (
      <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
        Add
      </Button>
    ),
  },
 
  
];

const GradeTable = ({handleOpen, enrolledStudents, searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() - 8);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    return dateTime.toLocaleString('en-US', options);
  };

    // Filter enrolledStudents based on searchQuery
    const filteredStudents = enrolledStudents.filter(student =>
      student.student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2, height: 'auto' }}>
    <TableContainer sx={{ maxHeight: 'none' }}>
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
            {filteredStudents.length === 0 ? (
                <TableRow>
                <TableCell colSpan={columns.length} align="center">
                    No data available
                </TableCell>
                </TableRow>
            ) : (
                filteredStudents
                
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell  style={{borderLeft: '1px solid #ccc',textTransform: 'uppercase'}}>{row.student.student_id}</TableCell>
                    <TableCell  style={{borderLeft: '1px solid #ccc',textTransform: 'uppercase'}}>{row.student.name}</TableCell>
                    
                    <TableCell align="center" style={{borderLeft: '1px solid #ccc'}}>
                        <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
                        Add
                        </Button>
                    </TableCell>
                   
                    </TableRow>
                ))
            )}
            </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={enrolledStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GradeTable;
