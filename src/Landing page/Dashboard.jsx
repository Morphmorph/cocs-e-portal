import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import uccplogo from '../assets/uccplogo.webp';
import schlogo from '../assets/schlogo.webp';
import { styled } from '@mui/system';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import throttle from 'lodash/throttle';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Login from './Login';

const pages = ['Home', 'About', 'Contact', 'Sign in'];

// Styled button with hover animation
const HoverButton = React.memo(styled(Button)({
  transition: 'transform 0.2s ease-in-out, border-bottom-color 0.2s ease-in-out',
  borderBottom: '5px solid transparent',
  borderRadius: 0,
  '&:hover': {
    transform: 'scale(1.1)',
    borderBottomColor: '#F2B569',
  },
}));
  
  const HoverMenuIcon = styled(MenuIcon)({
   
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
      color: '#F2B569',
    },
  });



  const Footer = () => {
    return (
      <footer style={{ position: 'static', bottom: 0, backgroundColor: '#079440', color: 'white', padding: '20px', textAlign: 'center', width: '100%' }}>
        <div className="footer-content">
          <div className="footer-item">
            <PhoneInTalkIcon fontSize="small"  />
            <span style={{ marginLeft: '5px' }}> 0975-495-6027 (TM)</span>
          </div>
          <div className="footer-item">
            <LocationOnIcon fontSize="small" />
            <span style={{ marginLeft: '5px' }}> F.Abellanosa St., CDOC</span>
          </div>
          <div className="footer-item">
            <EmailIcon fontSize="small" />
            <span style={{ marginLeft: '5px' }}> cocs.edu.ph@gmail.com</span>
          </div>
          <div className="footer-item">
            <FacebookIcon fontSize="small" />
            <span className="sm:text-sm" style={{ marginLeft: '5px' }}> Cagayan de Oro Christian School - UCCP</span>
          </div>
          </div>
          <p>&copy; 2024 Cagayan de Oro Christian School - UCCP. All rights reserved.</p>
        
      </footer>
    );
  };
  
  
  
function Dashboard({setLoggedInUser}) {

  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignInClick = () => {
    setShowLogin(true);
    setShowWelcome(false);
  };

  const scrollToHomeSection = () => {
    setShowWelcome(true);
    setShowLogin(false);
  };
  const handleCancelClick = () => {
    setShowLogin(false);
    setShowWelcome(true);
  };
Aos.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 100, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// you can also use default option with the line below
// AOS.init();
  const handleScroll = throttle(() => {
    // Your scroll handling logic here
  }, 200);

  // Attach the throttled scroll handler to the scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const cardStyle = {
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(102, 127, 167, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)',
  };
  const cardStyle2 = {
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(247, 247, 247, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '2px 8px 20px rgba(0, 0, 0, 0.3)',
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [currentImage, setCurrentImage] = useState(0);
    const imageSources = [schlogo, uccplogo];

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % imageSources.length);
        }, 3000); // Adjust the interval time as needed
    
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
      }, [imageSources.length]);
    
      const imageStyles = {
        image1: { height: '20rem', width: '20rem' }, // Adjust the height and width for the first image
        image2: { height: '20rem', width: '20rem' }, // Adjust the height and width for the second image
        // Add more styles for additional images as needed
      };
    
      const currentImageStyle = imageStyles[`image${currentImage + 1}`];
      
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AppBar position="fixed" sx={{ bgcolor: '#079440', }}>
        <Container maxWidth="xl" sx={{ width: '100%' }}>
        <Toolbar disableGutters>
          <img src={uccplogo} alt="" className="h-12 w-12 lg:h-20 lg:w-20 transition-all duration-300" loading='lazy'/>
          <img src={schlogo} alt="" className="h-16 w-16 lg:h-24 lg:w-24 transition-all duration-300" loading='lazy'/>

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
              textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
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
              textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
            }}
          >
            COCS-UCCP
          </Typography>
          <Box
            sx={{
              ml: 'auto',
              mr: -2,
              display: { md: 'none', lg: 'flex', xs: 'none' },
            }}
          >
          {pages.map((page) => (
  <HoverButton
    key={page}
    onClick={() => {
      if (page === 'Sign in') {
        handleSignInClick();
        const homeElement = document.getElementById('home');
        if (homeElement) {
          homeElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (page === 'Home') {
        const element = document.getElementById(page.toLowerCase());
        scrollToHomeSection();
        element.scrollIntoView({ behavior: 'smooth' });
      }
      else {
        const element = document.getElementById(page.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }}
    sx={{
      mx: 2,
      color: 'white',
      display: 'block',
      fontWeight: 500,
      textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)',
    }}
  >
    {page}
  </HoverButton>
))}

          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: 'flex', lg: 'none', xs: 'flex' },
              justifyContent: 'flex-end',
              
            }}
          >
             <HoverMenuIcon
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { md: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}
                onClick={() => {
                  if (page === 'Sign in') {
                    handleSignInClick();
                    const homeElement = document.getElementById('home');
                    if (homeElement) {
                      homeElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (page === 'Home') {
                    const element = document.getElementById(page.toLowerCase());
                    scrollToHomeSection();
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  else {
                    const element = document.getElementById(page.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                sx={{
                  color: 'black',
                }}>
                  <Typography textAlign="start">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <section id="home" className='mt-14 sm:mt-10 lg:h-screen grid gap-8 md:grid-cols-2 mb-14 md:mb-5 ' style={{}} >
    <div data-aos='zoom-in'  className='flex-1 flex flex-col pt-10 md:pt-5 items-center justify-center md:items-center md:justify-center '>
      <img
        src={imageSources[currentImage]}
        alt=""
        style={currentImageStyle} // Apply the specific style for the current image
        loading='lazy'
      />
    </div>
    {showLogin ? (
        <Login onCancelClick={handleCancelClick} setLoggedInUser={setLoggedInUser}/>
      ) : (
        showWelcome && (
    <div className='flex-1 px-4 flex flex-col text-center justify-center pb-10 pt-10 md:pt-10 lg:pb-0 mt-0 mx-2 lg:text-start lg:justify-center'>
      <p data-aos='fade-left' className='text-2xl sm:text-2xl md:text-2xl font-bold mb-2 italic' style={{ color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>WELCOME TO</p>
      <h1 data-aos='fade-right' className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
        Cagayan de Oro Christian School - UCCP <span style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>E-Portal</span>
      </h1>
      <p data-aos='fade-left' className='text-2xl sm:text-2xl md:text-2xl font-semibold mb-2 italic'>
        "Give your child an education that is nurtured by Christ-centered ideals.
      </p>
    </div>
        )
      )}
  </section>
  
  <section id="about" className='lg:h-screen grid gap-8 md:grid-cols-2 pt-5 pb-5 md:pb-5 md:pt-0 md:bottom-40' style={{backgroundColor: '#F2B569'}}>
  <div data-aos='fade-right' className='flex-1 flex flex-col px-4 items-center justify-center md:items-center md:justify-center'>
    <div className='p-5 rounded-lg text-center md:mt-5' style={cardStyle}>
      <h1 className='text-white text-xl sm:text-3xl md:text-5xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>ABOUT US</h1>
      <p className='text-white text-xl sm:text-2xl md:text-xl font-semibold mb-2 italic'style={{ textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>The Christian Center, now Cagayan de Oro Christian School (COCS) is the ministerial arm of the United Church of Christ in the Philippines, (UCCP) Cagayan de Oro City that welcomes young children to grow in wisdom and stature and in favor with God and man. COCS is a school where the education of the heart begins.</p>
    </div>
  </div>
  <div data-aos='fade-left' className='flex-1 px-4 flex flex-col items-center justify-center pb-5 md:pb-0 mt-0 mx-2 lg:text-start lg:justify-center'>
    <img src={schlogo} alt="" className='h-48 w-48 sm:h-60 sm:w-60 lg:h-96 lg:w-96' loading='lazy'/>
  </div>
</section>


<section id="contact" className='lg:h-screen grid gap-8 md:grid-cols-2 pt-5 pb-5 md:pb-5 md:pt-0 md:bottom-40' style={{backgroundColor: '' }}>
  <div data-aos='fade-up-right' className='flex-1 mt:5 flex flex-col px-4 items-center justify-center md:items-center md:justify-center md:mt-0'>
    <div className='p-5 rounded-lg text-center mt-0 lg:mt-5' style={cardStyle2}>
      <h1 className='text-white text-2xl sm:text-2xl md:text-4xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>VISION</h1>
      <p className='text-black text-xl sm:text-xl md:text-xl font-semibold mb-2 italic'style={{}}>Cagayan de Oro Christian School is a Christ-centered and family-oriented dynamic learning community, committed to develop individuals to be academically competent, socially responsible and spiritually mature.</p>
    </div>
  </div>
  <div data-aos='fade-up-left' className='flex-1 flex flex-col px-4 items-center justify-center md:items-center md:justify-center '>
    <div className='p-5 rounded-lg text-center md:mt-5' style={cardStyle2}>
      <h1 className='text-white text-2xl sm:text-2xl md:text-4xl font-bold mb-2 italic' style={{ color: '#F2B569', textShadow: '2px 2px 4px rgba(8, 8, 0, 0.8)' }}>MISSION</h1>
      <p className='text-black text-xl sm:text-xl md:text-xl font-semibold mb-2 italic'style={{}}>COCS provides quality education where the curriculum is unique by the inclusion of Bible as the core subject, operational and conductive activities: to produce competent and productive learners who are socially responsible and molded into Christ-like character.</p>
    </div>
  </div>
</section>

<Footer/>
    </div>
  );
}

export default Dashboard;
