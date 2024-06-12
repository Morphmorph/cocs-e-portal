import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import Aos from 'aos';
import 'aos/dist/aos.css'
import SProfile from '../Users/OtherProfile';
import TUserTable from '../Teacher page//TUsersTable';
import AddStudentModal from '../component/AddStudentModal';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import SGrades from '../Student page/SGrades';
import Attendance from './Attendance';
import SSGrades from '../Student page/SSGrades';
import AGrades from './AGrades';

function TSectionUsers({ onCancelClick, selectedRow }) {

  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const teacherGradeLevel = selectedRow.grade_level;
  const teacherSection = selectedRow.id;
  const [showProfileView, setShowProfileView] = useState(false);
  const [showGradesView, setShowGradesView] = useState(false);
  const [showAttendanceView, setShowAttendanceView] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableRows, setTableRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
    handleClose(); // Close the modal after adding the subject
    setSuccessModalOpen(true);
  };
  
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileView(true);
  };
  const handleViewGrades = (user) => {
    setSelectedUser(user);
    setShowGradesView(true);
  };
  const handleViewAttendance = (row) => {
    console.log("Selected Student ID:", row);
    setSelectedStudentId(row); 
    setShowAttendanceView(true);
  };

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        console.log('selected row:', selectedRow)
        const response = await axios.get(`http://127.0.0.1:8081/api/get_enrolled_students/${teacherSection}`);
        const { students } = response.data;
        setEnrolledStudents(students);
        console.log("Enrolled Students:", students);
      } catch (error) {
        console.error('Error fetching enrolled students data:', error);
      }
    };
  
    fetchEnrolledStudents(); // Call the function initially
  
    const interval = setInterval(fetchEnrolledStudents, 500); // Fetch data every 5 seconds
  
    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, [teacherSection]);

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
        <SProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser}/>
      ) : (
        showGradesView ? (
          <AGrades onCancelClick={() => setShowGradesView(false)} enrolledStudents={enrolledStudents} userData={selectedUser}/>
        ) : (
          showAttendanceView ? (
            <Attendance onCancelClick={() => setShowAttendanceView(false)} enrolledStudents={enrolledStudents} selectedStudentId={selectedStudentId}/>
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
              <h1 className='text-xl sm:text-2xl font-serif font-semibold uppercase' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>{selectedRow.grade_level} - {selectedRow.section_name}</h1>
            </div>
           
                </div>
              </div>
      
      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center md:justify-end mt-5 items-center ' style={{ top: '10px', right: '10px', }}>
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
              className='flex items-center justify-center rounded-lg py-2 w-full md:w-20 item-div ml-0 sm:ml-5'
              style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleOpen}
            >
              <img src={adduser} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 md:hidden' style={{ color: '#079440' }}>Add Student</h1>
            </div>
        {/* <Dropdown options={statusOptions} label="Status" /> */}
      </div>
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
      <AddStudentModal open={open} handleClose={handleClose} addSubjectToTable={addSubjectToTable} handleSuccessModalOpen={() => setSuccessModalOpen(true)} teacherGradeLevel={teacherGradeLevel} teacherSection={teacherSection}/>
      <TUserTable
              showProfileView={handleViewProfile}
              showGradesView={handleViewGrades}
              showAttendanceView={handleViewAttendance}
              enrolledStudents={enrolledStudents}
              searchQuery={searchQuery}
            />
      </div>
   </div>
      )))}
      
    </div>
      
  )
}

export default TSectionUsers;
