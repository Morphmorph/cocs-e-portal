import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from '@mui/icons-material/Warning';
import SentResetLinkModal from "../component/SentResetLinkModal";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modals from "../component/Modal";

function Login({ onCancelClick }) {
  const { setLoggedInUser } = useUser();
  const [open, setOpen] = React.useState(false);
  const [openSentResetLink, setOpenSentResetLink] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showErrorModal, setShowErrorModal] = useState(false); // State for showing error modal

const handleLogin = async () => {
  if (!userData.username.trim() || !userData.password.trim()) {
    setErrors({
      username: !userData.username.trim() ? "ID number is required" : "",
      password: !userData.password.trim() ? "Password is required" : ""
    });
    return;
  }
  
  try {
    const response = await axios.post("http://127.0.0.1:8081/api/login/", userData);
    console.log("Inputted data:", userData);

    if (response && response.data.role && response.data.user_id) {
      // Check if the user is admin (hardcoded check)
      if (userData.username === 'cocsadmin' && userData.password === 'cocs1955') {
        // Simulate a successful login response for the admin
        const adminResponse = {
          
          data: {
            role: 'admin',
            user_id: 1010203 // Hardcoded admin user ID
          }
          
        };
        setLoggedInUser(adminResponse.data);
        // Redirect to admin dashboard route ('/AdminDashboard')
        navigate('/ADashboard');
      } else {
        // Fetch user data using the user ID
        const userDataResponse = await axios.get(`http://127.0.0.1:8081/api/user/${userData.username}`);
        console.log("User data:", userDataResponse.data);
        
        // Store user data in context or state
        setLoggedInUser(userDataResponse.data);
        
        // Redirect based on user role
        if (userDataResponse.data.role === "student") {
          navigate('/SDashboard');
        } else if (userDataResponse.data.role === "teacher") {
          navigate('/TDashboard');
        }
      }
    }  else {
      console.error("Invalid response from server");
      // Show error modal for incorrect login details
      setShowErrorModal(true);
    }
  } catch (error) {
    console.error("Login error:", error);
    // Show error modal for any login errors
    setShowErrorModal(true);
  }
};


  Aos.init({
    disable: false, 
    startEvent: 'DOMContentLoaded', 
    initClassName: 'aos-init', 
    animatedClassName: 'aos-animate', 
    useClassNames: false, 
    disableMutationObserver: false, 
    debounceDelay: 50, 
    throttleDelay: 99, 
   
    offset: 120, 
    delay: 100, 
    duration: 800, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });
  
  const handleClose = () => setOpen(false);
  const handleOpenSentResetLink = () => setOpenSentResetLink(true);

  return (
    <div className="flex items-center justify-center px-5 pt-10 md:pt-10">
      <div
        data-aos='fade-left'
        className="p-5 rounded-xl"
        style={{
          boxShadow: "3px 5px 25px 2px rgba(0, 0, 0, 0.3)",
          overflowX: "hidden",
          position: "relative"
        }}
      >
        <div
          className="flex justify-end"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer"
          }}
        >
          <CancelIcon
            sx={{
              color: "#F2B569",
              fontSize: 32,
              transition: "color 0.3s, transform 0.3s",
              "&:hover": {
                color: "red",
                transform: "scale(1.1)"
              }
            }}
            onClick={onCancelClick}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold" style={{ color: "#079440" }}>
            LOGIN
          </h1>
          <p className="font-medium text-gray-600">Sign in to your account</p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%", my: 1 }
            }}
            noValidate
            autoComplete="off"
          >
            
            <TextField
              id="username"
              label="Username"
              variant="filled"
              value={userData.username}
              onChange={(e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  username: e.target.value
                }));
                // Clear error if user enters a value
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: ""
                  }));
                }
              }}
              error={!!errors.username} 
              helperText={errors.username} 
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              value={userData.password}
              onChange={(e) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  password: e.target.value
                }));
                // Clear error if user enters a value
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: ""
                  }));
                }
              }}
              error={!!errors.password} 
              helperText={errors.password} 
            />
          </Box>

          <div
            className="text-center text-blue-700 pb-2"
            onClick={handleOpenSentResetLink}
            style={{ cursor: "pointer" }}
          >
            <p>Forgot password?</p>
          </div>
          
          <Button
            variant="contained"
            style={{ background: "#079440", color: 'white' }}
            fullWidth
            startIcon={
              loading && (
                <CircularProgress size={24} />
              )
            }
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <SentResetLinkModal
          open={openSentResetLink}
          handleClose={() => setOpenSentResetLink(false)}
        />

        <Modals
          open={showErrorModal}
          handleClose={() => setShowErrorModal(false)}
          icon={<WarningIcon sx={{ fontSize: "200px", color: "red" }}/>}
          title="Account Error!"
          description="Incorrect username or password. Please try again."
        />
      </div>
    </div>
  );
}

export default Login;
