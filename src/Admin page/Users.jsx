import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import adduser from '../assets/adduser.webp';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import UserTable from '../Users/UserTable';
import Usersform from '../Users/Usersform';
import SProfile from '../Users/Profile';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Users({ onCancelClick }) {
  
  const [showProfileView, setShowProfileView] = useState(false);
  const [submittedUsers, setSubmittedUsers] = useState({ students: [], teachers: [] });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('all'); // State for selected user type
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 500); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8081/api/users/');
      const { students, teachers } = response.data;
      console.log("Fetched users data:", students, teachers); // Debugging statement

      // Process the data as needed
      setSubmittedUsers({ students, teachers });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleSaveUserData = (userType, userData) => {
    setSubmittedUsers(prevState => ({
      ...prevState,
      [userType]: [...prevState[userType], userData]
    }));
    setShowForm(false); // Close the form after saving user data
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileView(true);
  };

  useEffect(() => {
    const initAos = async () => {
        await Aos.init({
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
    };

    initAos();

    return () => {
        // Cleanup function if needed
    };
}, []);

  const userOptions = [
    { value: 'all', label: 'All' }, // Added 'all' option
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
  ];

  const handleAddUserClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleUserTypeChange = (userType) => {
    setSelectedUserType(userType);
  };

  return (
    <div>
      {showProfileView ? (
        <SProfile onCancelClick={() => setShowProfileView(false)} userData={selectedUser}/>
      ) : showForm ? (
        <Usersform onCancelClick={handleFormClose} onSaveUserData={handleSaveUserData} userTypeOptions={[{ value: 'student', label: 'Student' }, { value: 'teacher', label: 'Teacher' }]} />
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
              <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>USER ACCOUNTS</h1>
            </div>
            
                </div>
              </div>

          <div data-aos='fade-left' className='flex flex-col sm:flex-row justify-center sm:justify-end mt-1 items-center' style={{ top: '10px', right: '10px' }}>
          <div className='w-full'>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    width: '100%',
                    maxWidth: { md: '500px' },
                    marginBottom: '10px',
                  }}
                />
                  </div>
                  <div className='ml-0 sm:ml-5'>

                  </div>
            <Dropdown options={userOptions} label="User type" onChange={handleUserTypeChange} />
            
            <div
              className='flex items-center justify-center rounded-lg py-2 px-2 w-full sm:w-24 item-div ml-0 sm:ml-5 '
              style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleAddUserClick}
            >
              <img src={adduser} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 sm:hidden' style={{ color: '#079440' }}>Add New User</h1>
            </div>
          </div>

          <div data-aos='fade-right'>
            <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
            {/* Pass the selectedUserType state */}
            <UserTable
              showProfileView={handleViewProfile}
              users={selectedUserType === "all" ? submittedUsers.students.concat(submittedUsers.teachers) : selectedUserType === "student" ? submittedUsers.students : submittedUsers.teachers}
              selectedUserType={selectedUserType} // Pass the selected user type
              students={submittedUsers.students} // Pass students array as prop
              teachers={submittedUsers.teachers} //
              searchQuery={searchQuery} // Pass the search query
            />

            </div>
        </div>
      )}
    </div>
  );
}

export default Users;
