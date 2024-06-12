import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import GradeTable from '../Admin page/GradeTable';
import Aos from 'aos';
import 'aos/dist/aos.css'
import GradeViews from '../Admin page/Views/GradeViews';
import AddGradeModal from '../component/AddGradeModal';
import SuccessModal from '../component/SuccessModal';

function TGrades({onCancelClick, enrolledStudents, selectedRow }) {
  const [showGradeViews, setShowGradeViews] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (user) => {
      setOpen(true);
      setSelectedUser(user);

      console.log('selected rows:', selectedUser)
  }
  const handleClose = () => setOpen(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);


  const handleViewGrade = () => {
    setShowGradeViews(true);

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
    
    offset: 0, 
    delay: 100, 
    duration: 500, 
    easing: 'ease', 
    once: false, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
  });

  const Style = {
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    backgroundColor: 'rgba(17, 25, 40, 0.75)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '5px -4px 1px rgb(173, 173, 172)',
  };

  return (
    <div>
      <SuccessModal
            open={successModalOpen}
            handleClose={() => {
                setSuccessModalOpen(false);
                setOpen(false)
            }}
        />
      {showGradeViews ? (
        <GradeViews onCancelClick={() => setShowGradeViews(false)}  isTeacher={false}/>
      ) : (
        <div>
         <div data-aos='fade-left' className='relative' style={{}}>
          <div className='absolute top-0 right-0'>
            <CancelIcon
              sx={{
                color: '#F2B569',
                fontSize: 40,
                marginTop: -1,
                marginRight: -1,
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

          <div className='flex flex-col md:flex-row justify-start items-center mt-0 md:mt-0' style={{ top: '10px', right: '10px' }}>
            <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0 w-full'>
              <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ADD GRADES</h1>
            </div>
            
                </div>
              </div>

          <div data-aos='fade-left' className='flex flex-col sm:flex-row justify-center sm:justify-end mt-1 items-center' style={{ top: '10px', right: '10px' }}>
          <div className='w-full'>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Search"
                    sx={{
                      width: '100%',
                      maxWidth: { md: '500px' },
                      marginBottom: '10px',
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  </div>
                  <div className='ml-0 sm:ml-5'>

                  </div>
                  </div>
        <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
        <div data-aos='fade-right' >
        <AddGradeModal open={open} handleClose={handleClose} handleSuccessModalOpen={() => setSuccessModalOpen(true)} selectedUser={selectedUser} selectedRow={selectedRow} />
      
        <GradeTable 
          searchQuery={searchQuery} 
          handleOpen={handleOpen} 
          showGradeView={handleViewGrade} 
          enrolledStudents={enrolledStudents} 
          userData={selectedUser}
        />
      </div>
      </div>
      )}
    </div>
  )
}

export default TGrades