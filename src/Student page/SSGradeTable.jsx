import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'subject', label: 'Subject', minWidth: 170, align: 'center' },
  { id: '1st Grading', label: '1st Grading', minWidth: 170, align: 'center' },
  { id: '2nd Grading', label: '2nd Grading', minWidth: 170, align: 'center' },
  { id: '3rd Grading', label: '3rd Grading', minWidth: 170, align: 'center' },
  { id: '4th Grading', label: '4th Grading', minWidth: 170, align: 'center' },
  { id: 'Remarks', label: 'Remarks', minWidth: 170, align: 'center' },
];

const SSGradeTable = ({ grades }) => {
  if (grades.length === 0) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  No data available
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  // Organize grades by subject and grading period
  const organizeGrades = () => {
    const organizedData = {};

    grades.forEach((grade) => {
      const { subject_name, grading_period, grade: gradeValue } = grade;

      if (!organizedData[subject_name]) {
        organizedData[subject_name] = { grades: [], remarks: '' };
      }

      if (gradeValue !== null) {
        organizedData[subject_name].grades.push(gradeValue);
      }
    });

    // Initialize subjects without grades
    const allSubjects = [...new Set(grades.map((grade) => grade.subject_name))];
    allSubjects.forEach((subject) => {
      if (!organizedData[subject]) {
        organizedData[subject] = { grades: [], remarks: '' };
      }
    });

    return organizedData;
  };

  // Calculate remarks based on average grade
  const calculateRemarks = (averageGrade) => {
    if (averageGrade >= 75) {
      return 'Passed';
    } else {
      return 'Failed';
    }
  };

  const organizedGrades = organizeGrades();

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
            {Object.keys(organizedGrades).map((subject, index) => (
              <TableRow key={index}>
                <TableCell align="center">{subject}</TableCell>
                {columns.slice(1).map((column, columnIndex) => {
                  if (columnIndex < columns.length - 2) {
                    return (
                      <TableCell key={column.id} align="center" style={{ borderLeftWidth: 1 }}>
                        {organizedGrades[subject].grades[columnIndex] !== undefined
                          ? organizedGrades[subject].grades[columnIndex]
                          : 'Null'}
                      </TableCell>
                    );
                  } else {
                    const sumGrades = organizedGrades[subject].grades.reduce((acc, curr) => acc + curr, 0);
                    const numOfGrades = organizedGrades[subject].grades.length;
                    const averageGrade = numOfGrades > 0 ? sumGrades / numOfGrades : 'Null';
                    const remarks = calculateRemarks(averageGrade);

                    return (
                      <TableCell key={column.id} align="center" style={{ borderLeftWidth: 1 }}>
                        {remarks}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default SSGradeTable;


