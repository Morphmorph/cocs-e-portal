import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import users from '../assets/users.webp';
import star from '../assets/triggers.webp';
import attendance from '../assets/attendance.webp';
import ledger from '../assets/ledger.webp';
import folder from '../assets/folder.webp';
import Users from './Users';
import Grades from './Grades';
import Attendance from './Attendance';
import ASubjectHandles from './ASubjectHandles';
import ASectionHandled from './ASectionHandled';

const sections = [
  { key: 'users', label: 'User accounts', image: users, bgColor: '#3E3A40' },
  { key: 'grades', label: 'Triggers', image: star, bgColor: '#00476B' },
  { key: 'attendance', label: 'Attendance', image: attendance, bgColor: '#682D6B' },
  { key: 'subjecthandles', label: 'Teacher Subjects', image: ledger, bgColor: '#6B571A' },
  { key: 'sectionhandles', label: 'Teacher Advisory', image: folder, bgColor: '#436B0E' },
];

function ADashboard() {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedSection = localStorage.getItem('activeSection');
    if (storedSection) {
      setActiveSection(storedSection);
    }
  }, []);

  const handleClick = (section) => {
    setActiveSection(section);
    localStorage.setItem('activeSection', section);
  };

  const handleCancelClick = () => {
    setActiveSection('');
    localStorage.removeItem('activeSection');
    const newPath = location.pathname.replace(/\/ADashboard\/(users|triggers|attendance|subjecthandles|sectionhandles)/, '/ADashboard');
    navigate(newPath);
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ paddingTop: '20px', marginBottom: '20px', cursor: 'pointer' }}>
        {activeSection ? (
          // Render the selected section component
          {
            users: <Users onCancelClick={handleCancelClick} />,
            grades: <Grades onCancelClick={handleCancelClick} />,
            attendance: <Attendance onCancelClick={handleCancelClick} />,
            subjecthandles: <ASubjectHandles onCancelClick={handleCancelClick} />,
            sectionhandles: <ASectionHandled onCancelClick={handleCancelClick} />,
          }[activeSection]
        ) : (
          // Render section links
          <Grid container spacing={3}>
            {sections.map((section) => (
              <Grid key={section.key} item xs={12} sm={6} md={4} lg={4}>
                <Link to={`/ADashboard/${section.key}`} className="link">
                  <div className={`text-white p-8 text-end rounded-xl item-div`} onClick={() => handleClick(section.key)} style={{ backgroundColor: section.bgColor, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)' }}>
                    <h1 className='text-2xl font-bold font-serif'>{section.label}</h1>
                    <img src={section.image} alt="" className="h-12 w-12 lg:h-20 lg:w-20 item-image" />
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default ADashboard;