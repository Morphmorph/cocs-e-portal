import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import add from "../assets/add.webp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function NewBillingModal({ open, handleClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      // Handle click only if the backdrop itself is clicked
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
                background: "red", // Change the color on hover
                transform: "scale(1.1)", // Apply a scale effect on hover
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
            Add New Billing
          </Typography>

          {/* Wrap TextFields in a Box with display flex and justifyContent */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <TextField
              label="Description"
              id="descrition-billing-modal"
              size="small"
              style={{ marginRight: "2vw" }}
            />

            <TextField label="Amount" id="amount-billing-modal" size="small" />
          </Box>

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