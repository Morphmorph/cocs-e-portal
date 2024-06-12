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
  { id: 'created_at', label: 'Date created', minWidth: 170, align: 'center' },
  { id: 'user_type', label: 'User type', minWidth: 170, align: 'center' },
  { id: 'id', label: 'ID No.', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    align: 'center',
    render: (user, showProfileView) => (
      <Button variant="contained" color="primary" onClick={() => showProfileView(user)}>
        View
      </Button>
    ),
  },
];

const UserTable = ({ showProfileView, students, teachers, selectedUserType, searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const allUsers = [...students, ...teachers];
    const filtered = selectedUserType === 'all' ? allUsers :
      selectedUserType === 'student' ? students : teachers;

    const lowercasedQuery = searchQuery.toLowerCase();
    const searchFiltered = filtered.filter(user => {
      const id = user.student ? user.student.studentID : user.teacher.employeeID;
      const name = user.student ? `${user.student.firstName} ${user.student.middleName || ''} ${user.student.lastName}` : `${user.teacher.firstName} ${user.teacher.middleName || ''} ${user.teacher.lastName}`;
      return id.toLowerCase().includes(lowercasedQuery) || name.toLowerCase().includes(lowercasedQuery);
    });

    setFilteredUsers(searchFiltered);
  }, [students, teachers, selectedUserType, searchQuery]);

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
          {filteredUsers.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredUsers
                .sort((a, b) => {
                  const dateA = new Date(a.student ? a.student.created_at : a.teacher.created_at);
                  const dateB = new Date(b.student ? b.student.created_at : b.teacher.created_at);
                  return dateB - dateA; // Sort by created_at descending
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}
                        >
                          {column.id === 'details' ? (
                            <Button variant="contained" color="primary" onClick={() => showProfileView(row)}>
                              View
                            </Button>
                          ) : column.id === 'id' ? (
                            (row.student && row.student.studentID) || (row.teacher && row.teacher.employeeID) || '-'
                          ) : column.id === 'user_type' ? (
                            (row.student ? 'Student' : 'Teacher')
                          ) : column.id === 'name' ? (
                            `${row.student ? `${row.student.firstName} ${row.student.middleName ? row.student.middleName + ' ' : ''}${row.student.lastName}` : ''}`
                            + `${row.teacher ? `${row.teacher.firstName} ${row.teacher.middleName ? row.teacher.middleName + ' ' : ''}${row.teacher.lastName}` : ''}`
                          ) : column.id === 'created_at' ? (
                            formatDateTime(row.student ? row.student.created_at : row.teacher.created_at)
                          ) : (
                            value || '-'
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {filteredUsers.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default UserTable;
