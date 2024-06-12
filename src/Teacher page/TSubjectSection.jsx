import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import TAttendance from './TAttendance';
import TGrades from './TGrades';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import TSubjectSectionTable from './TSubjectSectionTable';
import TOtherProfile from '../Users/TOtherProfile';
import GradeViews from '../Admin page/Views/GradeViews';

function TSubjectSection({ onCancelClick, selectedRow}) {
  
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const teacherSection = selectedRow.section_id;
  const [showProfileView, setShowProfileView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 
  const [showGrades, setShowGrades] = useState(false);
  const [showGradesView, setShowGradesView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewGrades = (user) => {
    setSelectedUser(user);
    setShowGrades(true);
  };
  const handleGradesView = (user) => {
    setSelectedUser(user);
    setShowGradesView(true);
  };
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileView(true);
  };

  useEffect(() => {
    // Fetch enrolled students data
    const fetchEnrolledStudents = async () => {
      try {
        console.log('Selected row:', selectedRow)
        const response = await axios.get(`http://127.0.0.1:8081/api/sub/get_enrolled_students/${teacherSection}`); 
        const { students } = response.data;
        setEnrolledStudents(students);
        console.log("Enrolled Students:", students);
      } catch (error) {
        console.error('Error fetching enrolled students data:', error);
      }
    };

    fetchEnrolledStudents(); 
    const interval = setInterval(fetchEnrolledStudents, 5000); 
  
    return () => clearInterval(interval);
  }, [teacherSection]);
  

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8081/api/attendance/');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

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
    <SuccessModal
            open={successModalOpen}
            handleClose={() => {
                setSuccessModalOpen(false);
                setOpen(false)
            }}
        />
      {showProfileView ? (
        <TOtherProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser} />
      ) : (
      showGrades ? (
        <TGrades onCancelClick={() => setShowGrades(false)} enrolledStudents={enrolledStudents} userData={selectedUser} selectedRow={selectedRow}/>
      ) : (
        showGradesView ? (
          <GradeViews onCancelClick={() => setShowGradesView(false)} enrolledStudents={enrolledStudents} userData={selectedUser} selectedRow={selectedRow}/>
        ) : (
        showAttendance ? (
        <TAttendance onCancelClick={() => setShowAttendance(false)} enrolledStudents={enrolledStudents} attendanceData={attendanceData}/>
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
              <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              {selectedRow.grade_level} - {selectedRow.section}
              </h1>
              <h1 className='text-2xl uppercase font-serif font-semibold' style={{ color: '#CC33FF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                [{selectedRow.subject}]
              </h1>
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

            <div
              className='flex items-center justify-center rounded-lg py-1 px-1 sm:px-2 sm:py-2 w-full sm:w-20 item-div ml-0 sm:ml-5 '
              style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleViewGrades}
            >
              <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 sm:hidden' style={{ color: '#079440' }}>Add Grades</h1>
            </div>
            </div>
      
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569', paddingTop: 2}}></div>
      <TSubjectSectionTable
              showProfileView={handleViewProfile}
              showGrades={handleViewGrades}
              showGradesView={handleGradesView}
              enrolledStudents={enrolledStudents}
              searchQuery={searchQuery}
            />
      </div>
   </div>
      ))))}
      
    </div>
      
  )
}

export default TSubjectSection;
