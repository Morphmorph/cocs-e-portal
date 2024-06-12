// CustomAppBar.js

import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useUser } from '../UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import uccplogo from '../assets/uccplogo.webp';
import schlogo from '../assets/schlogo.webp';

const CustomAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser } = useUser();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
  };

  const getSettings = () => {
    let settings = ['Profile', 'Logout']; // Default settings

    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        settings = ['Logout'];
      } else if (loggedInUser.role === 'student' || loggedInUser.role === 'teacher') {
        settings = ['Profile', 'Logout'];
      }
    }

    return settings;
  };

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Profile') {
      let profilePath = ''; // Initialize the profile path
      if (loggedInUser.role === 'admin') {
        // If the user is an admin, navigate to the home page
        profilePath = '/';
      } else if (loggedInUser.role === 'student' || loggedInUser.role === 'teacher') {
        // If the user is a student or teacher, construct the profile path based on the current location
        profilePath = `/${location.pathname.split('/')[1]}/Profile`;
      }
      navigate(profilePath); // Navigate to the constructed profile path
    } else if (setting === 'Logout') {
      setLogoutModalOpen(true);
    } else {
      // Handle other settings
    }
  };
  
  const handleLogoutConfirmed = () => {
    setLogoutModalOpen(false);
    // Handle logout logic
    sessionStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleLogoutCancelled = () => {
    setLogoutModalOpen(false);
  };
  
  return (
    <>
    <AppBar position="sticky" sx={{ bgcolor: '#079440' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={uccplogo}
            alt=""
            className="h-16 w-16 lg:h-24 lg:w-28 transition-all duration-300 mr-2 bg-white"
            style={{marginLeft: -10}}
          />
          <img
            src={schlogo}
            alt=""
            className="h-16 w-16 lg:h-24 lg:w-28 transition-all duration-300 bg-white"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: { md: 'flex', xs: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { md: '20px' },
            }}
          >
            CAGAYAN DE ORO CHRISTIAN SCHOOL - UCCP
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xs: '18px' },
              alignItems: { xs: 'center' },
            }}
          >
            COCS-UCCP
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
          
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className='flex h-12 w-12 md:h-12 md:w-12 rounded-full bg-slate-500 items-center justify-center' style={{borderWidth: 1, borderColor: '#F2B569'}}>
              <p style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>
                {loggedInUser.role === 'admin' ? (
                  'A'
                ) : (
                  getInitials(loggedInUser?.name).toUpperCase()
                )}
              </p>
              </div>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {getSettings().map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
     {/* Logout Confirmation Dialog */}
     <Dialog open={logoutModalOpen} onClose={handleLogoutCancelled}>
     <DialogTitle>Logout Confirmation</DialogTitle>
     <DialogContent>
       <Typography>Are you sure you want to log out?</Typography>
     </DialogContent>
     <DialogActions>
       <Button onClick={handleLogoutConfirmed} color="primary">Logout</Button>
       <Button onClick={handleLogoutCancelled} color="secondary">Cancel</Button>
     </DialogActions>
   </Dialog>
   </>
  );
};

export default CustomAppBar;
