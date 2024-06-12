import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

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

export default function SentResetLinkModal({ open, handleClose }) {
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MailOutlineIcon sx={{ fontSize: "100px", color: "#079440" }} />

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                color: "#079440",
                fontWeight: "bold",
                marginTop: "2vh",
              }}
            >
              Contact the administrator
            </Typography>

            <Typography variant="subtitle2" style={{ marginTop: "2vh" }}>
              We will verify you please contact us through this email
            </Typography>

            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
              cocs.admin@gmail.com
            </Typography>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}