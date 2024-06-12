import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import add from "../assets/add.webp";
import axios from 'axios';

const useResponsiveStyle = () => {
  const theme = useTheme();
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 550 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "90vh",
    [theme.breakpoints.up("sm")]: {
      width: 550,
    },
  };
};

export default function AddStudentModal({ open, handleClose, handleSuccessModalOpen, teacherGradeLevel, teacherSection }) {
  const [loading, setLoading] = useState(false);
  const style = useResponsiveStyle();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentError, setStudentError] = useState(false);

  const handleChangeStudent = (event) => {
    const selectedStudentId = event.target.value;
    setSelectedStudent(selectedStudentId);
    setStudentError(false);
  };
  
  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8081/api/get_students/?grade_level=${teacherGradeLevel}&without_section=true`);
      const { students } = response.data;
      setStudents(students);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  

  const handleAddButtonClick = async () => {
    try {
      if (!selectedStudent) {
        setStudentError(true);
        return;
      }

      const sectionHandleData = {
        student_id: selectedStudent,
        section_handle_id: teacherSection

      };
 // Log the student_id and section_id
 console.log('Student ID:', selectedStudent);
 console.log('Section ID:', teacherSection);

      const response = await axios.post('http://127.0.0.1:8081/api/add_student_to_section/', sectionHandleData);
      
      setLoading(true);
      if (response.status === 200) {
        setLoading(false);
        handleSuccessModalOpen();
        console.log("Student added to section successfully");
        console.log("Added student data:", sectionHandleData);
        setSelectedStudent("");
        setStudentError(false);
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error("Error adding student to section:", error);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <div>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              background: "#F2B569",
              transition: "background 0.3s, transform 0.3s",
              "&:hover": {
                background: "red",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </IconButton>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#079440", fontWeight: "bold", marginTop: "3vh" }}
          >
            Add Students to Section
          </Typography>

          
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="large" fullWidth error={studentError}>
                <InputLabel id="student-label">Student</InputLabel>
                <Select
                    labelId="student-label"
                    id="student-select"
                    value={selectedStudent}
                    onChange={handleChangeStudent}
                    label="Student"
                    >
                    {students.map((student) => {
                        return (
                        <MenuItem key={student.id} value={student.id}>
                            {`${student.firstName} ${student.middleName || ''} ${student.lastName || ''}`}
                        </MenuItem>
                        );
                    })}
                </Select>
                {studentError && <Typography variant="caption" color="error">Please select a student</Typography>}
              </FormControl>
            </Grid>
         

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              style={{ background: "#F2B569", color: 'white' }}
              startIcon={
                loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Avatar src={add} sx={{ width: 20, height: 20 }} />
                )
              }
              onClick={handleAddButtonClick}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}
