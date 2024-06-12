import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useUser } from '../UserContext';
import SAttendanceTable from './SAttendanceTable';

function SAttendance({ onCancelClick, }) {

  const [attendanceSData, setAttendanceSData] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [initialStatusCounts, setInitialStatusCounts] = useState({});
  const { loggedInUser } = useUser()

  Aos.init({
    // Global settings...
  });

  useEffect(() => {
    const fetchAttendanceSData = async () => {
      try {
        
        if (loggedInUser.user_id) {
          const response = await axios.get(`http://127.0.0.1:8081/api/attendance/${loggedInUser.user_id}`);
          setAttendanceSData(response.data);
          setInitialStatusCounts(getInitialStatusCounts(response.data));
        }
  
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    fetchAttendanceSData();
  }, [loggedInUser.user_id]);

  const getInitialStatusCounts = (data) => {
    const counts = {
      'Present': 0,
      'Absent': 0,
      'Cutting': 0,
      'Late': 0,
      'Excuse': 0
    };
    data.forEach(item => {
      counts[item.status] += 1;
    });
    return counts;
  };
  console.log('Selected row:', attendanceSData)

  const handleFilterStatus = (status) => {
    setFilteredStatus(filteredStatus === status ? null : status);
  };

  const filteredData = filteredStatus ? attendanceSData.filter(data => data.status === filteredStatus) : attendanceSData;

  return (
    <div>
      <div data-aos='fade-left' className='relative pb-5' style={{  }}>
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
                <div className='flex flex-col md:flex-row justify-start items-start mt-0 md:mt-0' style={{  }}>
                    <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
                    <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ATTENDANCE RECORD</h1>
                    </div>
                </div>
            </div>
      
      <div data-aos='fade-left' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5 mb-2'>
      {['Present', 'Absent', 'Cutting', 'Late', 'Excuse'].map((status, index) => (
        <div key={index} className='px-6 py-2 rounded-lg text-center item-div' style={{ backgroundColor: '#F2B569', cursor: 'pointer' }} onClick={() => handleFilterStatus(status)}>
          <p className='font-semibold text-green-800 uppercase'>Total {status}</p>
          <p className='font-bold' style={{ color: getStatusColor(status) }}>{initialStatusCounts[status]}</p>
        </div>
      ))}
      </div>

      <div data-aos='fade-right' style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
      
        <div data-aos='fade-right' >
      <SAttendanceTable attendanceSData={filteredData} />
      </div>
    </div>
  );
}

const getStatusColor = (status) => {
  const colorMap = {
    'Present': 'blue',
    'Absent': 'red',
    'Late': 'red',
    'Cutting': 'red',
    'Excuse': 'blue'
  };
  return colorMap[status];
};

export default SAttendance;
