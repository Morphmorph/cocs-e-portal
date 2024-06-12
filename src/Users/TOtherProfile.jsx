import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Face, Phone, LocationOn, WorkOutline, Cake, Event, Face3, Person, Class, Stars, School, HomeWorkOutlined, FlagOutlined, Numbers, EventBusy, CalendarMonth, HistoryEdu } from '@mui/icons-material';
import options from './options.json'; // Import the entire JSON object


function TOtherProfile({ onCancelClick, userData }) {

  const [isMotherInfo, setIsMotherInfo] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('Face');
  const isStudent = !!userData.student;

  const toggleInfo = () => {
    setIsMotherInfo(prevState => !prevState);
    setCurrentIcon(prevIcon => (prevIcon === 'Face' ? 'Face3' : 'Face'));
  };
  
  // Function to format date
  const formatDate = (date) => {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
  };

  // Format dates
  const dobDate = new Date(isStudent ? userData.student.dob : userData.teacher.dob);
  const formattedDate = formatDate(dobDate);

  const dobDate2 = userData.student.parent ? new Date(userData.student.parent.f_dob) : null;
  const formattedDate2 = dobDate2 ? formatDate(dobDate2) : null;
  
  const dobDate3 = userData.student.parent ? new Date(userData.student.parent.m_dob) : null;
  const formattedDate3 = dobDate3 ? formatDate(dobDate3) : null;

  const dobDate4 = userData.academic ? new Date(userData.academic.expirationDate) : null;
  const formattedDate4 = dobDate4 ? formatDate(dobDate4) : null;

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

  const Style = {
    width: '95%',
    textAlign: 'center',
    backdropFilter: 'blur(5px) saturate(190%)',
    WebkitBackdropFilter: 'blur(5px) saturate(190%)',
    backgroundColor: 'rgba(247, 247, 247, 0.5)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '5px 4px 1px rgb(173, 173, 172)',
  };

  console.log('data', userData)

  const getInitials = (name) => {
    if (!name) return "";
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
  };
  
  return (
    <div>
     
    <div className=' grid gap-8 md:grid-cols-2 mb-14 md:mb-5 h-1/3'  >
    
    <div className='flex flex-col items-center justify-center md:items-center md:justify-center' style={{}}>
  <div data-aos='zoom-in' style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
    <div className='justify-start items-center'>
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
    {/* <div className='justify-end items-center'>
      <EditIcon
        style={{
          color: '#079440',
          fontSize: 40,
          transition: 'color 0.3s, transform 0.3s',
          cursor: 'pointer'
        }}
        onClick={onCancelClick}
      />
    </div> */}
  </div>

  <div data-aos='zoom-in' style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
    <div className='flex h-60 w-60 md:h-80 md:w-80 rounded-full bg-slate-500 items-center justify-center' style={{borderBottomWidth: 10, borderTopWidth: 10, borderColor: '#F2B569'}}>
    <p style={{ color: 'white', fontSize: 130, textAlign: 'center',}}>
    {getInitials(userData.student.name).toUpperCase()}
    </p>
    </div>
  </div>
  
  <div data-aos='fade-right' className='p-5 mt-5 mb-5 items-start-start' style={Style}>
  {isStudent ? (
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Student Information</h1>
    ) : (
      <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Teacher Information</h1>
    )}
            <div className='flex flex-col'>
            <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
              <Person style={{ color: '#079440' }} />
              <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Name:</span> {/* Birthday */}
              <span className='uppercase text-right ml-2'> {isStudent ? `${userData.student.name}` : `${userData.teacher.name}`}</span>
            </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Class style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>ID number: </span>
                <span className='uppercase text-right'> {isStudent ? userData.student.student_id : userData.teacher.employee_id}</span> 
              </p>
             
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Stars style={{ color: '#079440' }}/> 
              
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Grade & section: </span>
               
                <span className='uppercase text-right ml-2'> {userData.section.section_grade_level} - {userData.section.section_name}</span>
              </p>
             
              {/* {isStudent ? (
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <School style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Adviser: </span>
                <span className='uppercase text-right ml-2'>{getAdviserLabel(userData.student.adviser)}</span> 
              </p>
              ) : (
                <div></div>
              )} */}
              </div>
              </div>
</div>

    
    <div data-aos='fade-left' className='flex flex-col justify-start items-center md:items-start md:justify-start' style={{}}>
   
          <div className='p-5 mt-0 md:mt-5 mb-5 items-start-start' style={Style}>
            <h1 className='uppercase font-semibold pb-2' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>Personal Information</h1>
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Cake style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{formattedDate}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Event style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.age : userData.teacher.age}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Face style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Gender</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.gender : userData.teacher.gender}</span>
              </p>
              {!isStudent ? (
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <Phone style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.contactNumber}</span>
              </p>) : (
                <div></div>
              )}
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440' }}>
                <LocationOn style={{ color: '#079440' }} />
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Address</span>
                <span className='uppercase text-right ml-2'>{isStudent ? userData.student.address : userData.teacher.address}</span>
              </p>
            </div>
          </div>
          {isStudent ? (
          <div className='p-5 mt-5 items-start-start' style={Style}>
            
             <div className='flex items-center justify-between ' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>
                <h1 className='uppercase font-semibold pb-2'>Parents Information</h1>
                <div className='item-div'>
                {currentIcon === 'Face' ? (
                  <Face onClick={toggleInfo} style={{ cursor: 'pointer', fontSize: 40, color: '#079440' }} className='animate-bounce'/>
                ) : (
                  <Face3 onClick={toggleInfo} style={{ cursor: 'pointer', fontSize: 40, color: '#079440' }} className='animate-bounce'/>
                )}
                </div>
              </div>
            
            {isMotherInfo ? (
              
            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face3 style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Mother's Name</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.mothersName}</span> 
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{formattedDate3}</span> 
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.m_age}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.mothersContact}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Occupation</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.mothersOccupation}</span> 
              </p>
              
            </div>
             ) : (
              <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Face style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Father's Name</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.fathersName}</span> 
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Cake style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Date of birth</span>
                <span className='uppercase text-right ml-2'>{formattedDate2}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Event style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Age</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.f_age}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Phone style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Contact #</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.fathersContact}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <WorkOutline style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Occupation</span>
                <span className='uppercase text-right ml-2'>{userData.student.parent.fathersOccupation}</span>
              </p>
             
            </div>
            
            )}
           
          </div>
          ) : (
            <div className='p-5 mt-5 items-start-start' style={Style}>
            
             <div className='flex items-center justify-center ' style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}>
                <h1 className='uppercase font-semibold pb-2'>Academic Information</h1>
               
              </div>

            <div className='flex flex-col'>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <HomeWorkOutlined style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Last School Attended</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.lastSchoolAttended}</span>
                
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <LocationOn style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>School Address</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.schoolAddress}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Stars style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Year Graduated</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.yearGraduated}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <FlagOutlined style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Degree</span> 
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.degree}</span> 
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <Numbers style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>PRC number</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.prcNumber}</span> 
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <EventBusy style={{ color: '#079440' }}/> 
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>PRC Expiration date</span>
                <span className='uppercase text-right ml-2'>{formattedDate4}</span>
              </p>
              <p className='flex items-center py-1' style={{ borderBottomWidth: 1, borderColor: '#079440', }}>
                <HistoryEdu style={{ color: '#079440' }}/>
                <span className='uppercase text-left ml-2 flex-grow text-blue-700'>Years of teaching</span>
                <span className='uppercase text-right ml-2'>{userData.teacher.academic.yearsOfTeaching}</span>
              </p>
            </div>
            
          </div>
          )}
    </div>
  </div>
  </div>
  );
}

export default TOtherProfile;
