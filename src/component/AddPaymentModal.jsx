import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import add from "../assets/add.webp";

const useResponsiveStyle = () => {
  const theme = useTheme();
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 550 }, // Adjust width based on screen size
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: "scroll", // Enable vertical scrolling
    maxHeight: "90vh", // Set a maximum height to prevent modal from exceeding viewport height
    [theme.breakpoints.up("sm")]: {
      width: 550,
    },
  };
};

export default function AddPaymentModal({ open, handleClose }) {
  const style = useResponsiveStyle();
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const [gradeLevel, setGradeLevel] = React.useState("");
  const [section, setSection] = React.useState("");
  const [adviser, setAdviser] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleChangeGradeLevel = (event) => {
    setGradeLevel(event.target.value);
  };

  const handleChangeSection = (event) => {
    setSection(event.target.value);
  };

  const handleChangeAdviser = (event) => {
    setAdviser(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <div onClick={handleBackdropClick}>
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
            Add New Payment
          </Typography>

          <Grid container spacing={2}>
            {/* ID textfield */}
            <Grid item xs={12} sm={6} mt={3}>
              <TextField
                disabled
                id="id-disabled"
                label="ID"
                defaultValue="123456789"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Name textfield */}
            <Grid item xs={12} sm={6} mt={3}>
              <TextField
                label="Name"
                id="name-payment-modal"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* New Row of Fields */}
          <Grid container spacing={2}>
            {/* Contact no textfield */}
            <Grid item xs={12} sm={6} mt={3}>
              <TextField
                label="Contact no."
                id="contact-payment-modal"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Grade level select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="grade-level-label">Grade Level</InputLabel>
                <Select
                  labelId="grade-level-label"
                  id="grade-level-select"
                  value={gradeLevel}
                  onChange={handleChangeGradeLevel}
                  label="Grade Level"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Kinder 1"}>Kinder 1</MenuItem>
                  <MenuItem value={"Kinder 2"}>Kinder 2</MenuItem>
                  <MenuItem value={"Grade 1"}>Grade 1</MenuItem>
                  <MenuItem value={"Grade 2"}>Grade 2</MenuItem>
                  <MenuItem value={"Grade 3"}>Grade 3</MenuItem>
                  <MenuItem value={"Grade 4"}>Grade 4</MenuItem>
                  <MenuItem value={"Grade 5"}>Grade 5</MenuItem>
                  <MenuItem value={"Grade 6"}>Grade 6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* New Row of Fields */}
          <Grid container spacing={2}>
            {/* Section select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="section-label">Section</InputLabel>
                <Select
                  labelId="section-label"
                  id="section-select"
                  value={section}
                  onChange={handleChangeSection}
                  label="Section"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Love"}>Love</MenuItem>
                  <MenuItem value={"Peace"}>Peace</MenuItem>
                  <MenuItem value={"Faith"}>Faith</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Adviser select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="adviser-label">Adviser</InputLabel>
                <Select
                  labelId="adviser-label"
                  id="adviser-select"
                  value={adviser}
                  onChange={handleChangeAdviser}
                  label="Adviser"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Evelyn Stone"}>Evelyn Stone</MenuItem>
                  <MenuItem value={"Alexander Cross"}>Alexander Cross</MenuItem>
                  <MenuItem value={"Gabrielle Chen"}>Gabrielle Chen</MenuItem>
                  <MenuItem value={"Vincent Larson"}>Vincent Larson</MenuItem>
                  <MenuItem value={"Daniel Roberts"}>Daniel Roberts</MenuItem>
                  <MenuItem value={"Olivia Wright"}>Olivia Wright</MenuItem>
                  <MenuItem value={"Benjamin Hayes"}>Benjamin Hayes</MenuItem>
                  <MenuItem value={"Isabella Rivera"}>Isabella Rivera</MenuItem>
                  <MenuItem value={"Nathan Patel"}>Nathan Patel</MenuItem>
                  <MenuItem value={"Sophia Chang"}>Sophia Chang</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* New Row of Fields */}
          <Grid container spacing={2}>
            {/* Status select field */}
            <Grid item xs={12} sm={6} mt={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  onChange={handleChangeStatus}
                  label="Status"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value={"Paid"}>Paid</MenuItem>
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Overdue"}>Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Align the button to the right using Box */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              style={{ background: "#F2B569" }}
              startIcon={<Avatar src={add} sx={{ width: 20, height: 20 }} />}
            >
              Add
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}