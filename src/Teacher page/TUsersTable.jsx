import React, { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SwitchContext } from '../switchStatesContext';

const columns = [
  { id: 'created_at', label: 'Date created', minWidth: 170, align: 'center' },
  { id: 'student_id', label: 'ID No.', minWidth: 170 },
  { id: 'student_name', label: 'Student Name', minWidth: 170 },
  {
    id: 'attendance',
    label: 'Attendance',
    minWidth: 170,
    align: 'center',
    render: (row, showAttendanceView) => (
      <Button variant="contained" onClick={() => showAttendanceView(row)}>
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
  {
    id: 'promote',
    label: 'Promote',
    minWidth: 170,
    align: 'center',
    render: (row, handlePromote, handleConfirmationOpen) => (
      <>
        <Button variant="contained" color="success" onClick={() => handleConfirmationOpen(row)}>
          Promotion
        </Button>
      </>
    ),
  },
];

const TUserTable = ({ showProfileView, showGradesView, enrolledStudents, showAttendanceView, searchQuery, handlePromote }) => {
  const { switchStates } = useContext(SwitchContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmationOpen = (student) => {
    setSelectedStudent(student);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setSelectedStudent(null);
    setConfirmationOpen(false);
  };

  const handleConfirmationYes = () => {
    if (selectedStudent) {
      handlePromote(selectedStudent);
      setSelectedStudent(null);
      setConfirmationOpen(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() - 8); // Adjust timezone if necessary
  
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
    student.student && (
      student.student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2, height: 'auto' }}>
      <TableContainer sx={{ maxHeight: 'none' }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
            {columns
              .filter((column) => column.id !== 'promote' || switchStates.promotion)
              .map((column) => (
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
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center" style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}>{formatDateTime(row.created_at)}</TableCell>
                    <TableCell style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}>{row.student && row.student.student_id}</TableCell>
                    <TableCell style={{ borderLeft: '1px solid #ccc', textTransform: 'uppercase' }}>{row.student && row.student.name}</TableCell>
                    <TableCell align="center" style={{ borderLeft: '1px solid #ccc' }}>
                      <Button variant="contained" color="primary" onClick={() => showAttendanceView(row)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center" style={{ borderLeft: '1px solid #ccc' }}>
                      <Button variant="contained" color="secondary" onClick={() => showGradesView(row)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center" style={{ borderLeft: '1px solid #ccc' }}>
                      <Button variant="contained" color="primary" onClick={() => showProfileView(row)}>
                        View
                      </Button>
                    </TableCell>
                    {switchStates.promotion && (
                      <TableCell align="center" style={{ borderLeft: '1px solid #ccc' }}>
                        <Button variant="contained" color="success" onClick={() => handleConfirmationOpen(row)}>
                          Promote
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Promotion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to promote this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmationYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TUserTable;

