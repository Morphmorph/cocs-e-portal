import React, { useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AddGradeModal from '../component/AddGradeModal';
import { SwitchContext } from '../switchStatesContext';

function Grades({ onCancelClick }) {
  const { switchStates, setSwitchStates } = useContext(SwitchContext);

  const handleSwitchChange = (event) => {
    setSwitchStates({
      ...switchStates,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePromotionSwitchChange = (event) => {
    setSwitchStates({
      ...switchStates,
      promotion: event.target.checked,
    });
  };

  Aos.init({
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

  return (
    <div>
      <div>
        <div data-aos='fade-left' className='relative pb-5' style={{}}>
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
          <div className='flex flex-col md:flex-row justify-start items-start mt-0 md:mt-0' style={{}}>
            <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
              <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>TRIGGER OPTIONS</h1>
            </div>
          </div>
        </div>
      
        <div data-aos="fade-right" style={{ borderBottomWidth: 1, borderColor: '#F2B569' }}></div>
        
        <div data-aos="fade-right" className=''>
          <div className='text-center mt-5 rounded-lg'>
            <h1 className='text-2xl font-bold text-green-600 uppercase'>Grades Switch</h1>
          </div>
          <div className="py-5 flex flex-col lg:flex-row justify-start sm:justify-start items-start pb-0">
            {['first', 'second', 'third', 'fourth'].map((grade, index) => (
              <div
                key={grade}
                className={`flex items-center justify-between p-5 mt-0 rounded-lg ${switchStates[grade] ? 'bg-yellow-500' : 'bg-gray-500'} mb-5 mr-5 w-full lg:w-80`}
              >
                <Typography
                  sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates[grade] ? 'black' : 'white', marginLeft: 2 }}
                >
                  {`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} grading`}
                </Typography>
                <Switch
                  sx={{ transform: 'scale(1.5)', marginLeft: 2}}
                  color="success"
                  checked={switchStates[grade]}
                  onChange={handleSwitchChange}
                  name={grade}
                />
              </div>
            ))}
          </div>
          <div className='text-center mt-5 rounded-lg'>
            <h1 className='text-2xl font-bold text-green-600 uppercase'>Promotion Switch</h1>
          </div>
          <div className="py-5 flex flex-col lg:flex-row justify-start sm:justify-start items-start pb-0">
            <div
              className={`flex items-center justify-between p-5 mt-0 rounded-lg ${switchStates.promotion ? 'bg-yellow-500' : 'bg-gray-500'} mb-5 mr-5 w-full lg:w-80`}
            >
              <Typography
                sx={{ fontWeight: 'normal', textTransform: 'uppercase', color: switchStates.promotion ? 'black' : 'white', marginLeft: 2 }}
              >
                Promotion
              </Typography>
              <Switch
                sx={{ transform: 'scale(1.5)', marginLeft: 2}}
                color="success"
                checked={switchStates.promotion}
                onChange={handlePromotionSwitchChange}
                name="promotion"
              />
            </div>
          </div>
        </div>
        <AddGradeModal switchStates={switchStates} />
      </div>
    </div>
  );
}

export default Grades;

