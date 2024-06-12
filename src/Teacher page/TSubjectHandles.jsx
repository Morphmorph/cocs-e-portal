import React, {useState, useEffect} from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import Aos from 'aos';
import 'aos/dist/aos.css'

import TSubjectHandleTable from './TSubjectHandleTable';
import axios from 'axios';
import { useUser } from '../UserContext';
import TSubjectSection from './TSubjectSection';

function TSubjectHandles({onCancelClick, }) {
  const { loggedInUser } = useUser()
  const [subjectHandle, setSubjectHandle] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableRows, setTableRows] = useState([]);


  const handleViewProfile = (row) => {
    setSelectedRow(row);
  };

  useEffect(() => {
    // Fetch enrolled students data
    const fetchHandleSubjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8081/api/teachers/${loggedInUser.user_id}/subject_handles`); // Pass teacherSection as section_handle_id
        const subjectHandles = response.data;
        setTableRows(subjectHandles);
        console.log("Subject handles:", subjectHandles);
      } catch (error) {
        console.error('Error fetching subject handles data:', error);
      }
    };
  
    fetchHandleSubjects(); // Call the function to fetch enrolled students data
    const interval = setInterval(fetchHandleSubjects, 5000); // Fetch data every 5 seconds
  
    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, []);
  
  const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
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
      {selectedRow ? (
        <TSubjectSection  selectedRow={selectedRow} onCancelClick={() => setSelectedRow(null)}/>
      ) : (
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
                    <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ASSIGNED SUBJECTS</h1>
                    </div>
                </div>
            </div>

          <div data-aos='fade-right' className='pt-2'>
            <div style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
            <TSubjectHandleTable rows={tableRows} showProfileView={handleViewProfile} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TSubjectHandles