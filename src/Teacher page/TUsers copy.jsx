import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import UserTable from '../Users/UserTable';
import Usersform from '../Users/Usersform';
import check from '../assets/checked.webp';
import add from '../assets/add.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import SProfile from '../Users/Profile';
import TAttendance from './TAttendance';
import TGrades from './TGrades';
import { useUser } from '../UserContext';
import TUserTable from './TUsersTable';
import AddStudentModal from '../component/AddStudentModal';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import OtherProfile from '../Users/OtherProfile';

function TUsers2({ onCancelClick }) {
  const { loggedInUser } = useUser()
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const teacherGradeLevel = loggedInUser.section_handles[0].grade_level;
  const teacherSection = loggedInUser.section_handles[0].id;
  const [showProfileView, setShowProfileView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 
  const [showGrades, setShowGrades] = useState(false);
  const [submittedUsers, setSubmittedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableRows, setTableRows] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const handleViewGrades = () => {
    setShowGrades(true);
  };
const handleSaveUserData = (userType, userData) => {
    setSubmittedUsers([...submittedUsers, { ...userData, userType }]);
    setShowForm(false); // Close the form after saving user data
  };
  const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
    handleClose(); // Close the modal after adding the subject
    setSuccessModalOpen(true);
  };
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileView(true);
  };
  const handleCheckAttendanceClick = () => {
    setShowAttendance(true);
  };
  useEffect(() => {
    // Fetch enrolled students data
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8081/api/get_enrolled_students/${teacherSection}`); // Pass teacherSection as section_handle_id
        const { students } = response.data;
        setEnrolledStudents(students);
        console.log("Enrolled Students:", students);
      } catch (error) {
        console.error('Error fetching enrolled students data:', error);
      }
    };

    fetchEnrolledStudents(); // Call the function to fetch enrolled students data
    const interval = setInterval(fetchEnrolledStudents, 5000); // Fetch data every 5 seconds
  
    return () => clearInterval(interval); // Clean up setInterval on component unmount
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

  const handleUserTypeChange = (value) => {
    setSelectedUserType(value);
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
  
  const statusOptions = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
  ];
  
  const handleFormClose = () => {
    setShowForm(false);
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
      {showProfileView ? (
        <OtherProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser}/>
      ) : (
        showAttendance ? (
          <TAttendance onCancelClick={() => setShowAttendance(false)} enrolledStudents={enrolledStudents} attendanceData={attendanceData}/>
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
        <h1 className='text-2xl uppercase font-serif font-semibold px-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
       
        </h1>
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

      <div className='flex items-center justify-center rounded-lg px-5 py-2 w-full lg:w-60 item-div' style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px',}} onClick={handleCheckAttendanceClick}>
      <img src={check} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
      <h1 className='text-xl font-serif px-1 ' style={{ color: '#079440' }}>Attendance</h1>
    </div>
     
        {/* <Dropdown options={statusOptions} label="Status" /> */}
      </div>
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569', paddingTop: 0 }}></div>
      <AddStudentModal open={open} handleClose={handleClose} addSubjectToTable={addSubjectToTable} handleSuccessModalOpen={() => setSuccessModalOpen(true)} teacherGradeLevel={teacherGradeLevel} teacherSection={teacherSection}/>
      <TUserTable
              showProfileView={handleViewProfile}
              showGrades={handleViewGrades}
              enrolledStudents={enrolledStudents}
            />
      </div>
   </div>
      ))}
      
    </div>
      
  )
}

export default TUsers2;
