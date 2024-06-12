import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Dropdown from '../component/Dropdown';
import UAttendance from '../Users/UAttendance';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';

function TAttendance({ onCancelClick, enrolledStudents }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleStatusChange = async (status, studentId, sectionId) => {
    try {
      await axios.post('http://127.0.0.1:8081/api/attendance/update/', {
        student_id: studentId,
        status: status,
        section_id: sectionId
      });
      const response = await axios.get('http://127.0.0.1:8081/api/attendance/');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const refreshDailyStatus = async () => {
    try {
      await axios.post('http://127.0.0.1:8081/api/reset_daily_attendance');
      const response = await axios.get('http://127.0.0.1:8081/api/attendance/');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error resetting daily attendance:', error);
    }
  };

  useEffect(() => {
    const resetDailyStatus = () => {
      refreshDailyStatus();
    };

    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timeToMidnight = midnight.getTime() - now.getTime();
    const timerId = setTimeout(resetDailyStatus, timeToMidnight);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
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
      duration: 500,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  const statusOptions = [
    { value: 'Present', label: 'Present', color: '#7ac57a' },
    { value: 'Absent', label: 'Absent', color: '#ff9999' },
    { value: 'Late', label: 'Late', color: '#ffa64d' },
    { value: 'Cutting', label: 'Cutting', color: '#ffcc66' },
    { value: 'Excuse', label: 'Excuse', color: '#99ccff' },
  ];

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };
  
  useEffect(() => {
    console.log('Shitlected status:', statusFilter);
  }, [statusFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = enrolledStudents.filter(student => {
    const studentIdMatches = student.student.student_id.toLowerCase().includes(searchQuery.toLowerCase());
    const studentStatus = attendanceData.find(entry => entry.student === student.student.user_id)?.status || '';
    const statusOptionExists = statusOptions.some(option => option.value === statusFilter);
    const statusMatches = !statusFilter || (statusOptionExists && studentStatus === statusFilter);
    const nameMatches = student.student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return (studentIdMatches || nameMatches) && statusMatches;
  });

  return (
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
              <h1 className='text-xl sm:text-2xl font-serif font-semibold uppercase' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>CHECK ATTENDANCE</h1>
            </div>
            
                </div>
              </div>

      <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center md:justify-end mt-5 items-center ' style={{ top: '10px', right: '10px' }}>
      {/* <Dropdown options={statusOptions} label="Status" value={statusFilter} onChange={handleStatusFilterChange} /> */}
      <div className='w-full'>
              <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{
                    width: '100%',
                    maxWidth: { md: '500px' },
                    marginBottom: '10px',
                  }}
                />
                  </div>
      </div>

      <div data-aos='fade-right'>
        <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
        <UAttendance
          onCancelClick={onCancelClick}
          enrolledStudents={filteredStudents}
          attendanceData={attendanceData}
          handleStatusChange={handleStatusChange}
          statusFilter={statusFilter}
          statusOptions={statusOptions}
          onStatusFilterChange={handleStatusFilterChange}
        />
      </div>
    </div>
  );
}

export default TAttendance;
