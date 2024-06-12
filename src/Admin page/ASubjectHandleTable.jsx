import * as React from 'react';
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
  { id: 'created_at', label: 'Date created', minWidth: 200 },
  { id: 'subject', label: 'Subject name', minWidth: 170 },
  { id: 'teacher', label: 'Teacher', minWidth: 170 },
  { id: 'grade_level', label: 'Grade level', minWidth: 170 },
  { id: 'section', label: 'Section', minWidth: 170 },
  { id: 'time_in', label: 'Time start', minWidth: 170 },
  { id: 'time_out', label: 'Time end', minWidth: 170 },
  {
    id: 'details',
    label: 'View details',
    minWidth: 170,
    align: 'center',
    render: (row, handleViewProfile) => (
      <Button variant="contained" color="primary" onClick={() => handleViewProfile(row)}>
        View
      </Button>
    ),
  },
];

const ASectionHandledTable = ({ rows, handleViewProfile }) => {
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

  // Custom sorting function for grade levels
  const gradeLevelComparator = (a, b) => {
    const gradeLevelOrder = {
      'Grade 1': 1,
      'Grade 2': 2,
      'Grade 3': 3,
      'Grade 4': 4,
      'Grade 5': 5,
      'Grade 6': 6,
    };
    return gradeLevelOrder[a.grade_level] - gradeLevelOrder[b.grade_level];
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              rows
                .sort(gradeLevelComparator)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Only display rows for the current page
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}
                          >
                            {column.id === 'teacher' ? `${row.teacher.firstName} ${row.teacher.middleName} ${row.teacher.lastName}` : 
                            column.id === 'created_at' ? formatDateTime(value) : 
                            column.id === 'details' && column.render ? 
                            column.render(row, handleViewProfile) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default ASectionHandledTable;
