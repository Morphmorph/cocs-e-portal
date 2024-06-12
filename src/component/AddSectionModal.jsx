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
import data from ".././Users/options.json"; 
import axios from 'axios';
import Modals from './Modal';
import WarningIcon from '@mui/icons-material/Warning';

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

export default function AddSubjectHandleModal({ open, handleClose, handleSuccessModalOpen}) {
  const [loading, setLoading] = React.useState(false);
  const style = useResponsiveStyle();
  const [teachers, setTeachers] = React.useState([]);
  const [gradeLevel, setGradeLevel] = React.useState("");
  const [section, setSection] = React.useState("");
  const [gradeError, setGradeError] = React.useState(false);
  const [sectionError, setSectionError] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const [teacherError, setTeacherError] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const handleChangeTeacher = (event) => {
    const selectedTeacherId = event.target.value;
    setSelectedTeacher(selectedTeacherId); 
    setTeacherError(false); 
  };

  const { gradeLevels, sections} = data;
  useEffect(() => {
    fetchData();
     
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/users/');
      const { teachers } = response.data; 
      console.log("Fetched users data:",  teachers); 
  
      // Process the data as needed
      setTeachers(teachers); // Set teachers to the array directly
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  // Function to get sections based on selected grade level
  const getSectionsByGradeLevel = (gradeLevel) => {
    return sections[gradeLevel] || [];
  };
  const handleChangeGradeLevel = (event) => {
    const selectedGradeLevel = event.target.value;
    setGradeLevel(selectedGradeLevel);
    // Reset section when grade level changes
    setSection("");
    setSectionError(false); 
    setGradeError(false); 
  };

  const handleChangeSection = (event) => {
    const selectedSection = event.target.value;
    setSection(selectedSection);
    setSectionError(false); 
  };
  const getGradeLabel = (value) => {
    const grade = data.gradeLevels.find((grade) => grade.value === value);
    return grade ? grade.label : '';
  };

  const getSectionLabel = (grade, value) => {
    const section = data.sections[grade].find((section) => section.value === value);
    return section ? section.label : '';
  };

  const handleAddButtonClick = async () => {
    
    try {  
      // Check if any required field is empty
      if (!gradeLevel || !section || !selectedTeacher) {
        setGradeError(!gradeLevel);
        setSectionError(!section);
        setTeacherError(!selectedTeacher);
        return;
      }
  
      // Convert grade level and section to labels
      const gradeLevelLabel = getGradeLabel(gradeLevel);
      const sectionLabel = section ? getSectionLabel(gradeLevel, section) : null;
  
      const sectionHandleData = {
        teacher_id: selectedTeacher, 
        grade_level: gradeLevelLabel, 
        section: sectionLabel, 
      };
  
      const response = await axios.post('http://127.0.0.1:8081/api/add_section_handles/', sectionHandleData);
      
      setLoading(true)

      if (response.status === 200) {
        setLoading(false);
        handleSuccessModalOpen(); 
        console.log("Section handle added successfully");
        console.log("Added section handle data:", sectionHandleData);
        setGradeLevel("");
        setSection("");
        setSelectedTeacher("");
        setGradeError(false);
        setSectionError(false);
        setTeacherError(false);
      } else {
        setLoading(false);
        if (response.status === 400) {
          const { error } = response.data;
          setModalTitle("Adding Error!");
          setModalDescription(error);
          setShowErrorModal(true);
        } else if (response.status === 404) {
          const { error } = response.data;
          setModalTitle("Not Found Error!");
          setModalDescription(error);
          setShowErrorModal(true);
        } else if (response.status === 500) {
          const { error } = response.data;
          setModalTitle("Internal Server Error!");
          setModalDescription(error);
          setShowErrorModal(true);
        }
      }
    } catch (error) {
      setLoading(false);
      // Handle network error
      console.error("Error adding section handle:", error);

      // Check if it's a network error
      if (!error.response) {
        setModalTitle("Network Error!");
        setModalDescription("Network error occurred, please try again later.");
      } else {
        // It's some other error
        const { response } = error;
        if (response.status === 400) {
          const { error } = response.data;
          setModalTitle("Adding Error!");
          setModalDescription(error);
        } else if (response.status === 404) {
          const { error } = response.data;
          setModalTitle("Not Found Error!");
          setModalDescription(error);
        } else if (response.status === 500) {
          const { error } = response.data;
          setModalTitle("Internal Server Error!");
          setModalDescription(error);
        } else {
          setModalTitle("Error!");
          setModalDescription("An unexpected error occurred, please try again later.");
        }
      }
      setShowErrorModal(true);
    }
  };

  return (
    <>
    <Modals
        open={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
        icon={<WarningIcon sx={{ fontSize: "200px", color: "red" }}/>}
        title={modalTitle}
        description={modalDescription}
      />
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
            Teacher Handled Section
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={teacherError}>
                <InputLabel id="grade-level-label">Adviser</InputLabel>
                <Select
                    labelId="teacher-label"
                    id="teacher-select"
                    value={selectedTeacher}
                    onChange={handleChangeTeacher}
                    label="Teacher"
                    >
                    {teachers.map((teacher) => {
                        const { teacher: teacherData, academic } = teacher; 
                        console.log("Teacher:", teacher);
                        return (
                        <MenuItem key={teacherData.id} value={teacherData.id}> 
                            {`${teacherData.firstName || ''} ${teacherData.middleName || ''} ${teacherData.lastName || ''}`}
                        </MenuItem>
                        );
                    })}
                </Select>
                {teacherError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>
          
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={gradeError}>
                <InputLabel id="grade-level-label">Grade Level</InputLabel>
                <Select
                  labelId="grade-level-label"
                  id="grade-level-select"
                  value={gradeLevel}
                  onChange={handleChangeGradeLevel}
                  label="Grade Level"
                >
                  {gradeLevels.map((grade) => (
                    <MenuItem key={grade.value} value={grade.value}>
                      {grade.label}
                    </MenuItem>
                  ))}
                </Select>
                {gradeError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth error={sectionError}>
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  id="section-select"
                  value={section}
                  onChange={handleChangeSection}
                  label="Section"
                  
                >
                  {getSectionsByGradeLevel(gradeLevel).map((section) => (
                    <MenuItem key={section.value} value={section.value}>
                      {section.label}
                    </MenuItem>
                  ))}
                </Select>
                {sectionError && <Typography variant="caption" color="error">This field is required</Typography>}
              </FormControl>
            </Grid>

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
    </>
  );
}
