import React, { useState, useEffect, useContext } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import add from "../assets/add.webp";
import { SwitchContext } from '../switchStatesContext';
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

export default function AddGradeModal({ open, handleClose, handleSuccessModalOpen, selectedUser, selectedRow}) {
  const { switchStates } = useContext(SwitchContext);
  console.log('switchStates in AddGradeModal:', switchStates);

  const [loading, setLoading] = useState(false);
  const style = useResponsiveStyle();
  const [grade, setGrade] = useState('');
  const [gradingPeriod, setGradingPeriod] = useState('');
  const [gradeError, setGradeError] = useState(false);
  const [gradingPeriodError, setGradingPeriodError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const availableGradingPeriods = ['1st Grading', '2nd Grading', '3rd Grading', '4th Grading'].filter((period, index) => 
    switchStates && (
      (switchStates[`first`] && index === 0) || 
      (switchStates[`second`] && index === 1) || 
      (switchStates[`third`] && index === 2) || 
      (switchStates[`fourth`] && index === 3)
    )
  );
  
  const handleChangeGrade = (event) => {
    const value = event.target.value;
    setGrade(value);
    setGradeError(!value);
  };

  const handleChangeGradingPeriod = (event) => {
    const value = event.target.value;
    setGradingPeriod(value);
    setGradingPeriodError(!value);
  };

  const handleAddButtonClick = async () => {
    try {
      if (!grade || !gradingPeriod) {
        setGradeError(!grade);
        setGradingPeriodError(!gradingPeriod);
        return;
      }

      const gradeData = {
        student: selectedUser.student.user_id,
        subject_handle: selectedRow.id,
        grading_period: gradingPeriod,
        grade: grade
      };

      const response = await axios.post('http://127.0.0.1:8081/api/add_grade/', gradeData);

      setLoading(true);
      if (response.status === 201) {
        setLoading(false);
        handleSuccessModalOpen();
        console.log("Grade added successfully");
        console.log("Added grade data:", gradeData);
        setGrade('');
        setGradingPeriod('');
        setGradeError(false);
        setGradingPeriodError(false);
      } else {
        setLoading(false);
        if (response.status === 400) {
          const { error } = response.data;
          setModalTitle("Adding Error!");
          setModalDescription(error);
          setShowErrorModal(true);
        } else if (response.status === 405) {
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
        } else if (response.status === 405) {
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
            Add Student Grade
          </Typography>

          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" size="large" fullWidth error={gradeError}>
                <TextField
                  labelid="grade-label"
                  id="grade"
                  label='Grade'
                  value={grade}
                  onChange={handleChangeGrade}
                  type="number"
                  fullWidth
                />
                {gradeError && <Typography variant="caption" color="error">Please add a grade</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" size="large" fullWidth error={gradingPeriodError}>
              <InputLabel id="grading-period-label">Grading Period</InputLabel>
              <Select
                labelId="grading-period-label"
                id="grading-period"
                value={gradingPeriod}
                onChange={handleChangeGradingPeriod}
                fullWidth
                label="grading Period"
              >
                {availableGradingPeriods.map(period => (
                  <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
              </Select>
              {gradingPeriodError && <Typography variant="caption" color="error">Please select a grading period</Typography>}
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
