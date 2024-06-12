import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'subject', label: 'Subjects', minWidth: 170 },
  {
    id: 'first',
    label: '1st Quarter',
    align: 'center',
    minWidth: 170,
   
  },
  {
    id: 'second',
    label: '2nd Quarter',
    align: 'center',
    minWidth: 170,
    
  },
  {
    id: 'third',
    label: '3rd Quarter',
    align: 'center',
    minWidth: 170,
    
  },
  {
    id: 'fourth',
    label: '4th Quarter',
    align: 'center',
    minWidth: 170,
    
  },
  {
    id: 'remarks',
    label: 'Remarks',
    minWidth: 170,
    align: 'center',

  },
];

function createData(id, name, email, ranking) {
  return { id, name, email, ranking };
}

const rows = [
  createData(1234567890, 'John Doe', 'johndoe@gmail.com', 'Honor'),
  createData(1234567890, 'John Doe', 'johndoe@gmail.com', 'Honor'),
  createData(1234567890, 'John Doe', 'johndoe@gmail.com', 'With High Honor'),
  createData(1234567890, 'John Doe', 'johndoe@gmail.com', 'With Highest Honor'),
];

export default function GradesInfo({ showGradeView }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: '#079440', fontWeight: 'bold',}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ borderLeft: '1px solid #ccc' }}>
                          {column.render ? column.render(value, row, showGradeView) : value}
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
    </Paper>
  );
}
