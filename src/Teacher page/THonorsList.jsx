import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import SProfile from '../Users/Profile';
import HonorsTable from './HonorsTable';
import GradeViews from '../Admin page/Views/GradeViews';

function THonorsList({ onCancelClick }) {
  const [showProfileView, setShowProfileView] = useState(false);
  const [showGradesView, setShowGradesView] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // State to hold data for GradeViews component

  const handleViewGrades = (row) => {
    setSelectedRow(row);
    setShowGradesView(true);
  };

  const handleViewProfile = () => {
    setShowProfileView(true);
  };

  Aos.init({
    // Global settings:
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
    duration: 500, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });

  return (
    <div>
      {showProfileView ? (
        <SProfile onCancelClick={() => setShowProfileView(false)} />
      ) : (
        showGradesView ? (
          <GradeViews onCancelClick={() => setShowGradesView(false)} isHonor={true}/>
        ) : (
      
      <div>
      <div className='flex justify-start items-center' style={{ top: '10px', right: '10px' }}>
        
        <CancelIcon
          sx={{
            color: '#F2B569',
            fontSize: 40,
            transition: 'color 0.3s, transform 0.3s',
            '&:hover': {
              color: 'red', // Change the color on hover
              transform: 'scale(1.1)', // Apply a scale effect on hover
            },
            cursor: 'pointer'
          }}
          onClick={onCancelClick}
        />
      </div>
      
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center sm:justify-start mt-0 md:mt-0 items-center ' style={{ top: '10px', right: '10px' }}>
        <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
          <h1 className='text-2xl uppercase font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>List of honors</h1>
        </div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          sx={{
            width: '100%',
            maxWidth: { md: '500px', },
            mx: 2,
            marginBottom: '10px',
          }}
        />
        
      </div>
      
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center lg:justify-end mt-5 items-center ' style={{ top: '10px', right: '10px', }}>
      
        {/* <div className='flex items-center justify-center rounded-lg px-5 mx-10 py-2 w-full lg:w-56 item-div' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px',}} onClick={handleViewGrades}>
          <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
          <h1 className='text-xl font-serif px-1 ' style={{ color: '#079440' }}>Add Grades</h1>
        </div> */}
        
      </div>
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <HonorsTable data-aos='fade-left' showProfileView={handleViewProfile} showGradesView={handleViewGrades} />
            </div>
   </div>
      ))}
      
    </div>
      
  )
}

export default THonorsList;
