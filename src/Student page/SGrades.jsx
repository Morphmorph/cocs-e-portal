import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Dropdown from "../component/Dropdown";
import Aos from "aos";
import "aos/dist/aos.css";
import SGradeTable from "./SGradeTable";
import axios from 'axios';
import { useUser } from '../UserContext';

export default function SGrades({ onCancelClick, userData }) {
  const { loggedInUser } = useUser();
  const [grades, setGrades] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('');

  useEffect(() => {
    // Extract grade levels from section_handles
    if (loggedInUser && loggedInUser.section_handles) {
      const gradeLevels = loggedInUser.section_handles.map(handle => handle.grade_level);
      setGradeLevels(gradeLevels);
      // Set the initial selected grade level
      if (gradeLevels.length > 0) {
        setSelectedGradeLevel(gradeLevels[0]);
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    const fetchGrades = async () => {
      if (selectedGradeLevel) {
        try {
          console.log('loggedInUser:', loggedInUser);
          const response = await axios.get(`http://127.0.0.1:8081/api/get_student_grades/${userData.student.user_id}/${selectedGradeLevel}`);
          if (response.data.success) {
            setGrades(response.data.grades);
          } else {
            console.error('Failed to fetch grades:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
      }
    };

    fetchGrades(); // Initial fetch
    const intervalId = setInterval(fetchGrades, 1000); // Fetch every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userData.student.user_id, selectedGradeLevel]);

  Aos.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 0,
    delay: 100,
    duration: 500,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  const Style = {
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    boxShadow: "5px -4px 1px rgb(173, 173, 172)",
  };

  const handleGradeLevelChange = (gradeLevel) => {
    setSelectedGradeLevel(gradeLevel);
  };

  return (
    <div>
      <div data-aos='fade-left' className='relative pb-5' style={{ }}>
        <div className='absolute top-0 right-0'>
          <CancelIcon
            sx={{
              color: '#F2B569',
              fontSize: 40,
              marginTop: -1,
              marginRight: -1,
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: 'red',
                transform: 'scale(1.1)',
              },
              cursor: 'pointer'
            }}
            onClick={onCancelClick}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-start items-start mt-0 md:mt-0' style={{ }}>
          <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
            <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>REPORT OF GRADES</h1>
          </div>
        </div>
      </div>
      
      <div
        data-aos="fade-right"
        className="flex flex-col sm:flex-row justify-center sm:justify-end mt-5 items-center "
      >
      
      </div>
      <div
        data-aos="fade-right"
        style={{ borderBottomWidth: 1, borderColor: "#F2B569" }}
        className="pt-2"
      ></div>
      
      <div data-aos="fade-right">
        <SGradeTable grades={grades} />
      </div>
    </div>
  );
}
