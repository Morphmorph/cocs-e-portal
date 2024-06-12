import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";

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
   
    maxHeight: "90vh", // Set a maximum height to prevent modal from exceeding viewport height
    [theme.breakpoints.up("sm")]: {
      width: 550,
    },
  };
};

export default function ForgotPassModal({
  open,
  handleClose,
  handleOpenSentResetLink,
}) {
  const style = useResponsiveStyle();

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
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

          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "#079440", fontWeight: "bold", marginTop: "3vh" }}
            >
              Forgot your password?
            </Typography>

            <Typography variant="subtitle2" style={{ marginTop: "2vh" }}>
              We'll email you a link to reset your password.
            </Typography>
          </Box>

          <Box style={{ marginTop: "5vh" }}>
            {/* Email textfield */}
            <TextField id="email" label="Email" size="small" fullWidth />
          </Box>

          <Box sx={{ marginTop: "4vh" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleOpenSentResetLink();
                handleClose();
              }}
              style={{
                background: "#F2B569",
                textTransform: "none",
              }}
            >
              Send me a password reset link
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}