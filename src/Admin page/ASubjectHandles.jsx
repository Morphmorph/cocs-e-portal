import React, {useState, useEffect} from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import add from '../assets/add.webp'
import Aos from 'aos';
import 'aos/dist/aos.css'
import Dropdown from '../component/Dropdown';
import AddSubjectHandleModal from '../component/AddSubjectHandleModal';
import ASubjectHandleTable from './ASubjectHandleTable';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';

function ASubjectHandles({onCancelClick, }) {

  const [open, setOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 500); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clean up setInterval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get_subject_handles/');
      const subjectHandles = response.data;
      setTableRows(subjectHandles);
      console.log('subject_handles:', subjectHandles)
    } catch (error) {
      console.error('Error fetching section handles:', error);
    }
  };

  const handleViewProfile = (row) => {
    setSelectedRow(row); // Set the selected row
  };

  const addSubjectToTable = (subjectData) => {
    setTableRows([...tableRows, subjectData]);
    handleClose(); // Close the modal after adding the subject
    setSuccessModalOpen(true);
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
      <SuccessModal
        open={successModalOpen}
        handleClose={() => {
          setSuccessModalOpen(false);
          setOpen(false);
        }}
      />
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
                    <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>SUBJECT TEACHERS</h1>
                    </div>
                </div>
            </div>
        <div>

              <div data-aos='fade-left' className='flex flex-col md:flex-row justify-center md:justify-end mt-0 items-center ' style={{ top: '10px', right: '10px', }}>
              <div
              className='flex items-center justify-center rounded-lg py-2 w-full md:w-20 item-div'
              style={{ backgroundColor: '#F2B569', cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleOpen}
            >
              <img src={add} alt="" className="h-12 w-12 lg:h-10 lg:w-10" />
              <h1 className='text-xl font-serif px-1 md:hidden' style={{ color: '#079440' }}>Add Subject Teachers</h1>
            </div>
              </div>

           
        </div>
        <div data-aos="fade-up">
            <AddSubjectHandleModal open={open} handleClose={handleClose} addSubjectToTable={addSubjectToTable} handleSuccessModalOpen={() => setSuccessModalOpen(true)} />
          </div>
        <div data-aos='fade-right' >
        <div style={{borderBottomWidth: 1, borderColor: '#F2B569'}}></div>
       <ASubjectHandleTable rows={tableRows} handleViewProfile={handleViewProfile}/>
       </div>
    </div>
  )
}

export default ASubjectHandles