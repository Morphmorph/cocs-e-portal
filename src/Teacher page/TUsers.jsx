import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import check from '../assets/checked.webp';
import Aos from 'aos';
import 'aos/dist/aos.css'
import TAttendance from './TAttendance';
import SGrades from '../Student page/SGrades';
import { useUser } from '../UserContext';
import TUserTable from './TUsersTable';
import AddStudentModal from '../component/AddStudentModal';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import OtherProfile from '../Users/OtherProfile';
import Attendance from '../Admin page/Attendance';

function TUsers({ onCancelClick }) {
  const { loggedInUser } = useUser()
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const teacherGradeLevel = loggedInUser.section_handles[0].grade_level;
  const teacherSection = loggedInUser.section_handles[0].id;
  const [showProfileView, setShowProfileView] = useState(false);
  const [showGradesView, setShowGradesView] = useState(false);
  const [showAttendanceView, setShowAttendanceView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // New state for storing the selected student's ID
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableRows, setTableRows] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch enrolled students data
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8081/api/get_enrolled_students/${teacherSection}`);
        const { students } = response.data;
        setEnrolledStudents(students);
       console.log('enrolledStudents:', enrolledStudents)
      } catch (error) {
        console.error('Error fetching enrolled students data:', error);
      }
    };

    fetchEnrolledStudents(); 
    const interval = setInterval(fetchEnrolledStudents, 5000);
  
    return () => clearInterval(interval);
  }, [teacherSection]);

  const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
    handleClose();
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
  const handleCheckAttendanceClick = () => {
    setShowAttendance(true);
  };
  
 const handlePromote = async (row) => {
  const studentId = row.student.user_id;
  try {
    const response = await axios.put(`http://127.0.0.1:8081/api/students/promote/${studentId}/`);
    if (response.data.success) {
      // Assuming the API call is successful and the student is promoted
      console.log("Student promoted successfully!");

      // Remove the promoted student from the enrolledStudents array
      setEnrolledStudents(prevStudents =>
        prevStudents.filter(prevStudent => prevStudent.student.user_id !== studentId)
      );

      // Optionally, show a success message or perform other actions upon successful promotion
      setSuccessModalOpen(true);
    } else {
      // Optionally, handle the case where promotion failed but no error was thrown
      console.error('Failed to promote student:', response.data.message);
    }
  } catch (error) {
    console.error('Error promoting student:', error);
    // Optionally, show an error message or perform other error handling actions
  }
};


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
        <OtherProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser}/>
      ) : (
        showAttendance ? (
          <TAttendance onCancelClick={() => setShowAttendance(false)} enrolledStudents={enrolledStudents} attendanceData={attendanceData}/>
        ) : (
          showGradesView ? (
            <SGrades onCancelClick={() => setShowGradesView(false)} enrolledStudents={enrolledStudents} attendanceData={attendanceData} userData={selectedUser}/>
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
              <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              {loggedInUser && loggedInUser.section_handles && loggedInUser.section_handles.map((handle, index) => (
                <span key={index}>
                  {handle.grade_level} - {handle.section_name}
                  {index !== loggedInUser.section_handles.length - 1 && ', '}
                </span>
              ))}
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
              className='flex items-center justify-center rounded-lg py-2 w-full sm:w-20 item-div ml-0 sm:ml-5'
              style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleCheckAttendanceClick}
            >
              <img src={check} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 sm:hidden' style={{ color: '#079440' }}>Check attendance</h1>
            </div>
          </div>
         
      <div data-aos='fade-right'>
      <div style={{ borderBottomWidth: 1, borderColor: '#F2B569', paddingTop: 0 }}></div>
      <AddStudentModal open={open} handleClose={handleClose} addSubjectToTable={addSubjectToTable} handleSuccessModalOpen={() => setSuccessModalOpen(true)} teacherGradeLevel={teacherGradeLevel} teacherSection={teacherSection}/>
      <TUserTable
              showProfileView={handleViewProfile}
              showGradesView={handleViewGrades}
              showAttendanceView={handleViewAttendance}
              enrolledStudents={enrolledStudents}
              searchQuery={searchQuery}
              handlePromote={handlePromote} 
            />
      </div>
   </div>
      ))))}
      
    </div>
      
  )
}

export default TUsers;
