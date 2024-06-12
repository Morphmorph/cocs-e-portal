import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ledger from '../assets/ledger.webp';
import folder from '../assets/folder.webp';
import TUsers from './TUsers';
import TSubjectHandles from './TSubjectHandles';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

const sections = [
  { key: 'users', label: 'Advisory', image: folder, component: TUsers, bgColor: '#436B0E' },
  { key: 'subjecthandles', label: 'Subjects', image: ledger, component: TSubjectHandles, bgColor: '#6B571A' },
];

function TDashboard() {
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
    const newPath = location.pathname.replace(/\/TDashboard\/(users|subjecthandles)/, '/TDashboard');
    navigate(newPath);
  };
  
  return (
    <div>
      <Container maxWidth="xl" sx={{ paddingTop: '20px', marginBottom: '20px', cursor: 'pointer'}}>
        {activeSection && sections.find(sec => sec.key === activeSection) ? (
          // Render the selected section component dynamically
          React.createElement(sections.find(sec => sec.key === activeSection).component, { onCancelClick: handleCancelClick })
        ) : (
          // Render section links dynamically
          <Grid container spacing={3}>
            {sections.map((section) => (
              <Grid key={section.key} item xs={12} sm={6} md={4} lg={4}>
                <Link to={`/TDashboard/${section.key}`} className="link">
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

export default TDashboard;
