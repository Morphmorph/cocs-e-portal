import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170, align: 'center' },
  { id: 'day', label: 'Day', minWidth: 170, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
];

export default function SAttendanceTable({ attendanceSData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    
    const options = {
      year: 'numeric',
      month: 'long', // This will give you the full month name (e.g., "January")
      day: '2-digit',
    };
  
    return dateTime.toLocaleString('en-US', options);
  };

  const formatDay = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { weekday: 'long' });
  };

  // Sort the data by date in descending order
  const sortedAttendanceData = [...attendanceSData].sort((a, b) => new Date(b.date) - new Date(a.date));

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
          {sortedAttendanceData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
            sortedAttendanceData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align="center" >{formatDateTime(row.date)}</TableCell>
                  <TableCell align="center" style={{borderLeftWidth: 1,}}>{formatDay(row.date)}</TableCell>
                  <TableCell align="center" style={{borderLeftWidth: 1,}}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 50px', // Padding inside the background color
                        color: row.status === 'Present' ? 'blue' : 'red',
                        
                        borderRadius: '4px',
                      }}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortedAttendanceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
