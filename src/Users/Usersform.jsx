import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTextField from '../component/CustomTextField';
import CustomDropdown from '../component/CustomDropdown';
import CustomDatePicker from '../component/CustomDatePicker';
import dayjs from 'dayjs'; // Import dayjs library for date formatting
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import 'aos/dist/aos.css';
import SuccessModal from "../component/SuccessModal";
import data from './options.json'; // Import the JSON data
import Modals from '../component/Modal';
import WarningIcon from '@mui/icons-material/Warning';

function Usersform({ onCancelClick,  onSaveUserData, userTypeOptions  }) {

        const navigate = useNavigate();
        const [errors, setErrors] = useState({}); 
        const [loading, setLoading] = React.useState(false); 
        const [userType, setUserType] = useState('student');
        const [successModalOpen, setSuccessModalOpen] = useState(false);
        const [showErrorModal, setShowErrorModal] = useState(false);
        const [modalTitle, setModalTitle] = useState("");
        const [modalDescription, setModalDescription] = useState("");
      
        const [userData, setUserData] = useState({
            student: {
                studentID: '',
                lastName: '',
                firstName: '',
                middleName: '',
                password: '',
                address: '',
                gradeLevel: null,
                
                dob: null,
                age: null,
                gender: '',
                created_at: new Date().toISOString(),
            },
            parents: {
                mothersName: '',
                mothersContact: '',
                mothersOccupation: '',
                m_dob: null,
                m_age: null,
                fathersName: '',
                fathersContact: '',
                fathersOccupation: '',
                f_dob: null,
                f_age: null,
                created_at: new Date().toISOString(),
            },
            teacher: {
                employeeID: '',
                lastName: '',
                firstName: '',
                middleName: '',
                password: '',
                contactNumber: '',
                address: '',
                dob: null,
                age: null,
                gender: '',
                created_at: new Date().toISOString(),
            },
            academic: {
                lastSchoolAttended: '',
                schoolAddress: '',
                yearGraduated: null,
                degree: '',
                prcNumber: '',
                expirationDate: null,
                yearsOfTeaching: '',
                created_at: new Date().toISOString(),
            }
            
        });
        
        const Style = {
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.75)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.125)',
            boxShadow: '5px -4px 1px rgb(173, 173, 172)',
        };

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const gradeLevels = data.gradeLevels;

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
        };
    }, []);

    const validateStudentData = () => {
        const errors = {};
        const { student } = userData;
        const { parents } = userData;
        const nameRegex = /^[a-zA-Z\- ]*$/;

        if (!student.studentID) errors['studentID'] = "LRN is required";
        if (!student.lastName) {
            errors['lastName'] = "Last name is required";
        } else if (!nameRegex.test(student.lastName)) {
            errors['lastName'] = "Last name should contain only letters";
        }

        if (!student.firstName) {
            errors['firstName'] = "First name is required";
        } else if (!nameRegex.test(student.firstName)) {
            errors['firstName'] = "First name should contain only letters";
        }

        if (!student.middleName) {
            errors['middleName'] = "Middle name is required";
        } else if (!nameRegex.test(student.middleName)) {
            errors['middleName'] = "Middle name should contain only letters";
        }

        if (!student.password) errors['password'] = "Password is required";
        if (!student.gender) errors['gender'] = "Gender is required";
        if (!student.address) errors['address'] = "Complete address is required";
        if (!student.dob) errors['dob'] = "Date of Birth is required";
        if (!student.age) errors['age'] = "Age is required";
        if (!student.gradeLevel) errors['gradeLevel'] = "Grade level is required";
       


        if (!parents.mothersName) {
            errors['mothersName'] = "Mother's name is required";
        } else if (!nameRegex.test(parents.mothersName)) {
            errors['mothersName'] = "Mother's name should contain only letters";
        }

        if (!parents.mothersContact) errors['mothersContact'] = "Contact number is required";
        if (!parents.m_dob) errors['m_dob'] = "Date of Birth is required";
        if (!parents.m_age) errors['m_age'] = "Age is required";
        if (!parents.mothersOccupation) errors['mothersOccupation'] = "Mother's occupation is required";

        if (!parents.fathersName) {
            errors['fathersName'] = "Father's name is required";
        } else if (!nameRegex.test(parents.fathersName)) {
            errors['fathersName'] = "Father's name should contain only letters";
        }

        if (!parents.fathersContact) errors['fathersContact'] = "Contact number is required";
        if (!parents.f_dob) errors['f_dob'] = "Date of Birth is required";
        if (!parents.f_age) errors['f_age'] = "Age is required";
        if (!parents.fathersOccupation) errors['fathersOccupation'] = "Father's occupation is required";

        return errors;
    };

    const validateTeacherData = () => {
        const errors = {};
        const { teacher } = userData;
        const { academic } = userData;

        if (!teacher.employeeID) errors['employeeID'] = "Employee ID is required";
        if (!teacher.lastName) errors['lastName'] = "Last Name is required";
        if (!teacher.firstName) errors['firstName'] = "First Name is required";
        if (!teacher.middleName) errors['middleName'] = "Middle Name is required";
        if (!teacher.password) errors['password'] = "Password is required";
        if (!teacher.gender) errors['gender'] = "Gender is required";
        if (!teacher.contactNumber) errors['contactNumber'] = "Contact number is required";
        if (!teacher.address) errors['address'] = "Complete address is required";
        if (!teacher.dob) errors['dob'] = "Date of Birth is required";

        if (!academic.lastSchoolAttended) errors['lastSchoolAttended'] = "This field is required";
        if (!academic.schoolAddress) errors['schoolAddress'] = "This field is required";
        if (!academic.yearGraduated) errors['yearGraduated'] = "This field is required";
        if (!academic.degree) errors['degree'] = "This field is required";
        if (!academic.prcNumber) errors['prcNumber'] = "This field is required";
        if (!academic.expirationDate) errors['expirationDate'] = "This field is required";
        if (!academic.yearsOfTeaching) errors['yearsOfTeaching'] = "This field is required";

        return errors;
    };

    const handlePasswordChange = () => {
        const { student, teacher } = userData;
        const lrn = student.studentID || ''; 
        const lastName = student.lastName || ''; 
        const studentPassword = lastName ? `${lrn}@${lastName}` : lrn; 

        const employeeID = teacher.employeeID || ''; 
        const tlastName = teacher.lastName || ''; 
        const adviserPassword = tlastName ? `${employeeID}@${tlastName}` : employeeID; 

        setUserData(prevState => ({
            ...prevState,
            student: {
                ...prevState.student,
                password: studentPassword 
            },
            teacher: {
                ...prevState.teacher,
                password: adviserPassword 
            }
        }));
    };

    useEffect(() => {
        handlePasswordChange();
    }, [userData.student.studentID, userData.student.lastName, userData.teacher.employeeID, userData.teacher.lastName]);

    const handleInputChange = (e, category, subcategory = null) => {
        const { name, value } = e.target;
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
    
        if (subcategory) {
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [subcategory]: {
                        ...prevState[category][subcategory],
                        [name]: value
                    }
                }
            }));
        } else {
            const updatedUserData = {
                ...userData,
                [category]: {
                    ...userData[category],
                    [name]: value,
                    age: name === 'age' ? value : userData[category].age 
                }
            };
            setUserData(updatedUserData);
        }
    
        if ((category === 'student' && (name === 'studentID' || name === 'lastName')) ||
            (category === 'teacher' && (name === 'employeeID' || name === 'lastName'))) {
            handlePasswordChange(); 
        }

        if (name === 'password' && value.trim() !== '') {
            delete updatedErrors['password'];
        }
        setErrors(updatedErrors);
    };
    
    const handleDropdownChange = (category, member, value) => {
        if (member === 'gradeLevel') {
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [member]: value,
                    
                }
            }));
        } else {
            setUserData(prevState => ({
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [member]: value
                }
            }));
        }
    };

    const handleUserTypeChange = (value) => {
        setUserType(value);
        setErrors({});
    };
    useEffect(() => {
        setErrors({});
    }, [userType]);

    const handleDateChange = (category, member, date) => {
        const updatedUserData = {
            ...userData,
            [category]:{
                ...userData[category],
                [member]: date,
  
            }
        };
    
        let updatedAge;
        if (member === 'dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].age = updatedAge;
            setUserData(prevState => ({
                ...prevState,
                student: updatedUserData,
            }));
        } else if (member === 'm_dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].m_age = updatedAge;
        } else if (member === 'f_dob') {
            updatedAge = calculateAge(date);
            updatedUserData[category].f_age = updatedAge;
        }
    
        setUserData(updatedUserData);
    
        const updatedErrors = { ...errors };
        delete updatedErrors[member];
        delete updatedErrors[member.replace('dob', 'age', '_dob', '_age')];
        setErrors(updatedErrors);
    };
    
    const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
    };
    const getGradeLabel = (value) => {
        const grade = data.gradeLevels.find((grade) => grade.value === value);
        return grade ? grade.label : '';
      };
    
    const handleSubmit = async () => {
        let validationErrors = {};
        let serializedData = {};
        
        const formattedData = {
            ...userData,
            student: {
                ...userData.student,
                dob: userData.student.dob ? dayjs(userData.student.dob).format('YYYY-MM-DD') : null,
            },
            parents: {
                ...userData.parents,
                m_dob: userData.parents.m_dob ? dayjs(userData.parents.m_dob).format('YYYY-MM-DD') : null,
                f_dob: userData.parents.f_dob ? dayjs(userData.parents.f_dob).format('YYYY-MM-DD') : null,
            },
            teacher: {
                ...userData.teacher,
                dob: userData.teacher.dob ? dayjs(userData.teacher.dob).format('YYYY-MM-DD') : null,
            },
            academic: {
                ...userData.academic,
                yearGraduated: userData.academic.yearGraduated ? dayjs(userData.academic.yearGraduated).format('YYYY') : null,
                expirationDate: userData.academic.expirationDate ? dayjs(userData.academic.expirationDate).format('YYYY-MM-DD') : null,
            },
        };
    
        if (userType === 'student') {
            validationErrors = validateStudentData();
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
            if (Object.keys(validationErrors).length === 0) {
                // Use the getGradeLabel and getSectionLabel functions to retrieve labels
                const { gradeLevel } = formattedData.student;
                const gradeLevelLabel = getGradeLabel(gradeLevel);
                
                setLoading(false);
                // Construct the serialized data for a student including parent information
                serializedData = {
                    role: 'student',
                    ...formattedData.student,
                    gradeLevel: gradeLevelLabel,
                    parents: {
                        ...formattedData.parents,
                    },
                };
            }
        } else if (userType === 'teacher') {
            validationErrors = validateTeacherData();
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
            if (Object.keys(validationErrors).length === 0) {
                // Construct the serialized data for a teacher
                setLoading(false);
                serializedData = {
                    role: 'teacher',
                    ...formattedData.teacher,
                    academic: {
                        ...formattedData.academic,
                    },
                };
            }
        }
    
        if (Object.keys(validationErrors).length === 0) {
            console.log('Serialized Data:', serializedData);
            setLoading(true);
            try {
                await axios.post('http://127.0.0.1:8081/api/register/', serializedData);
                setLoading(false);
                setSuccessModalOpen(true);
            } catch (error) {
                setLoading(false);
                // Handle network error
                console.error("Error registering:", error);
        
                if (!error.response) {
                    setModalTitle("Network Error!");
                    setModalDescription("Network error occurred, please try again later.");
                } else {
                    const { response } = error;
                    if (response.status === 400) {
                        const { data } = response;
                        if (data.studentID && data.studentID[0] === "student with this studentID already exists.") {
                            setModalTitle("Registration Error!");
                            setModalDescription("A student with this ID already exists.");
                        } else {
                            setModalTitle("Registration Error!");
                            setModalDescription(data.error || "An error occurred during registration.");
                        }
                    } else if (response.status === 404) {
                        setModalTitle("Not Found Error!");
                        setModalDescription(response.data.error || "Resource not found.");
                    } else if (response.status === 500) {
                        setModalTitle("Internal Server Error!");
                        setModalDescription(response.data.error || "Internal server error occurred.");
                    } else {
                        setModalTitle("Error!");
                        setModalDescription("An unexpected error occurred, please try again later.");
                    }
                }
                setShowErrorModal(true);
            }
        } else {
            setErrors(validationErrors);
        }
    }        

    return (
        <div>
            <SuccessModal
                open={successModalOpen}
                handleClose={() => {
                    setSuccessModalOpen(false);
                    onCancelClick(); 
                }}
            />
             <Modals
                open={showErrorModal}
                handleClose={() => setShowErrorModal(false)}
                icon={<WarningIcon sx={{ fontSize: "200px", color: "red" }}/>}
                title={modalTitle}
                description={modalDescription}
            />
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
                <div className='flex flex-col md:flex-row justify-start items-start mt-0 md:mt-0' style={{  }}>
                    <div className='justify-center items-center lg:justify-start md:items-start mb-2 md:mt-0'>
                    <h1 className='text-xl sm:text-2xl font-serif font-semibold pr-5' style={{ color: '#079440', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ADD NEW USER</h1>
                    </div>
                </div>
            </div>

            <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Personal Information</h1>
            </div>
            
             <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            
             <CustomDropdown
                    label="User type"
                    options={userTypeOptions}
                    value={userType || ''}
                    onChange={handleUserTypeChange}
                />

            {userType === 'student' && (
                    <>
                        <CustomTextField
                            label="LRN"
                            value={userData.student.studentID}
                            type='numeric'
                            onChange={e => {
                                handleInputChange(e, 'student'); 
                                handlePasswordChange(); 
                            }} 
                            name="studentID"
                            required
                            error={errors['studentID']}
                            helperText={errors['studentID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.student.lastName}
                            onChange={e => {
                                handleInputChange(e, 'student'); 
                                handlePasswordChange(); 
                            }}
                            name="lastName"
                            required
                            error={errors['lastName']}
                            helperText={errors['lastName']}
                        />
                        <CustomTextField
                            label="First Name"
                            value={userData.student.firstName}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="firstName"
                            required
                            error={errors['firstName']}
                            helperText={errors['firstName']}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.student.middleName}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="middleName"
                            required
                            error={errors['middleName']}
                            helperText={errors['middleName']}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.student.password}
                            onChange={e => handleInputChange(e, 'student')}
                            name="password"
                            required
                            error={errors['password']}
                            helperText={errors['password'] ? "This field is required" : ""}
                        />
                       <CustomDropdown
                            label="Gender"
                            options={genderOptions}
                            value={userData.student.gender}
                            onChange={(value) => setUserData({ ...userData, student: { ...userData.student, gender: value } })}
                            required
                            error={errors['gender']}
                            helperText={errors['gender'] ? "This field is required" : ""}
                        />
                        
                         <CustomTextField
                            label="Complete address"
                            value={userData.student.address}
                            onChange={e => handleInputChange(e, 'student')} 
                            name="address"
                            required
                            error={errors['address']}
                            helperText={errors['address'] ? "This field is required" : ""}
                        />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={userData.student.dob}
                            onChange={(date) => handleDateChange('student', 'dob', date)}
                            error={errors['dob']} 
                            helperText={errors['dob']} 
                        />
                    <CustomTextField
                        label="Age"
                        value={userData.student.age}
                        onChange={(e) => handleInputChange(e, 'student')} 
                        error={errors['age']}
                        helperText={errors['age']}
                        InputLabelProps={{
                            shrink: !!userData.student.age, 
                        }}
                    />

   
                    <CustomDropdown
                        label="Grade level"
                        options={gradeLevels}
                        value={userData.student.gradeLevel}
                        onChange={(value) => handleDropdownChange('student', 'gradeLevel', value)}
                        required
                        error={errors['gradeLevel']}
                        helperText={errors['gradeLevel']}
                    /> 
                    </>
            )}

               {userType === 'teacher' && (
                    <>
                        <CustomTextField
                            label="Employee ID"
                            type="numeric"
                            value={userData.teacher.employeeID}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="employeeID"
                            error={errors['employeeID']}
                            helperText={errors['employeeID'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Last Name"
                            value={userData.teacher.lastName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="lastName"
                            error={errors['lastName']}
                            helperText={errors['alastName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="First Name"
                             value={userData.teacher.firstName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="firstName"
                            error={errors['firstName']}
                            helperText={errors['firstName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Middle Name"
                            value={userData.teacher.middleName}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="middleName"
                            error={errors['middleName']}
                            helperText={errors['middleName'] ? "This field is required" : ""}
                        />
                        <CustomTextField
                            label="Password"
                            value={userData.teacher.password}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="password"
                            error={errors['password']}
                            helperText={errors['password'] ? "This field is required" : ""}
                        />
                        <CustomDropdown
                            label="Gender"
                            options={genderOptions}
                            value={userData.teacher.gender}
                            onChange={(value) => setUserData({ ...userData, teacher: { ...userData.teacher, gender: value } })}
                            required
                            error={errors['gender']}
                            helperText={errors['gender'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Contact number"
                            type="numeric"
                             value={userData.teacher.contactNumber}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="contactNumber"
                            error={errors['contactNumber']}
                            helperText={errors['contactNumber'] ? "This field is required" : ""}
                        />
                          <CustomTextField
                            label="Complete address"
                             value={userData.teacher.address}
                            onChange={e => handleInputChange(e, 'teacher')} 
                            name="address"
                            required
                            error={errors['address']}
                            helperText={errors['address'] ? "This field is required" : ""}
                        />
                        <CustomDatePicker
                            label="Date of Birth"
                            value={userData.teacher.dob}
                            onChange={(date) => handleDateChange('teacher', 'dob', date)}
                            required
                            error={errors['dob']}
                            helperText={errors['dob'] ? "This field is required" : ""}
                        />

                        <CustomTextField
                            label="Age"
                            value={userData.teacher.age}
                            onChange={(e) => handleInputChange(e, 'teacher')}
                            readOnly
                            error={errors['age']}
                            helperText={errors['age'] ? "This field is required" : ""}
                        />
                        
                    </>
               )}
            </div>
 
            {userType === 'student' && (
                <div>
                    <div  data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Parents Information</h1>
                    </div>

                    <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    <CustomTextField
                        label="Mother's Name"
                        value={userData.parents.mothersName}
                        onChange={e => handleInputChange(e, 'parents')} 
                        name="mothersName"
                        error={errors['mothersName']}
                        helperText={errors['mothersName']}
                    />
                       <CustomDatePicker
                            label="Date of Birth"
                            value={userData.parents.m_dob}
                            onChange={(date) => handleDateChange('parents', 'm_dob', date)}
                            required
                            error={errors['m_dob']}
                            helperText={errors['m_dob'] ? "This field is required" : ""}
                        />

                    <CustomTextField
                        label="Mother's Age"
                        value={userData.parents.m_age}
                        onChange={(e) => handleInputChange(e, 'parents')} 
                        error={errors['m_age']}
                        helperText={errors['m_age']}
                        InputLabelProps={{
                            shrink: !!userData.parents.m_age, 
                        }}
                    />
                        <CustomTextField
                            label="Mother's Contact number"
                            type='numeric'
                            value={userData.parents.mothersContact}
                            onChange={e => handleInputChange(e, 'parents')} 
                            name="mothersContact"
                            error={errors['mothersContact']}
                            helperText={errors['mothersContact']}
                        />
                        
                        <CustomTextField
                            label="Mother's Occupation"
                            value={userData.parents.mothersOccupation}
                            onChange={e => handleInputChange(e, 'parents')} 
                            name="mothersOccupation"
                            error={errors['mothersOccupation']}
                            helperText={errors['mothersOccupation']}
                        />
                        </div>

                        <div data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <CustomTextField
                            label="Father's Name"
                            value={userData.parents.fathersName}
                            onChange={e => handleInputChange(e, 'parents')} 
                            name="fathersName"
                            error={errors['fathersName']}
                            helperText={errors['fathersName']}
                        />
                       <CustomDatePicker
                            label="Date of Birth"
                            value={userData.parents.f_dob}
                            onChange={(date) => handleDateChange('parents', 'f_dob', date)}
                            required
                            error={errors['f_dob']}
                            helperText={errors['f_dob'] ? "This field is required" : ""}
                        />
                       <CustomTextField
                        label="Father's Age"
                        value={userData.parents.f_age}
                        onChange={(e) => handleInputChange(e, 'parents')} 
                        error={errors['f_age']}
                        helperText={errors['f_age']}
                        InputLabelProps={{
                            shrink: !!userData.parents.f_age,
                        }}
                    />
                
                        <CustomTextField
                            label="Father's Contact number"
                            type='numeric'
                            value={userData.parents.fathersContact}
                            onChange={e => handleInputChange(e, 'parents')} 
                            name="fathersContact"
                            error={errors['fathersContact']}
                            helperText={errors['fathersContact']}
                        />
                        
                        <CustomTextField
                            label="Father's Occupation"
                            value={userData.parents.fathersOccupation}
                            onChange={e => handleInputChange(e, 'parents')} 
                            name="fathersOccupation"
                            error={errors['fathersOccupation']}
                            helperText={errors['fathersOccupation']}
                        />
                    </div>

                    <div className="flex justify-center mt-5">       
                        <Button
                        variant="contained"
                        style={{ background: "#F2B569", color: 'white'}}
                        startIcon={
                            loading && (
                            <CircularProgress size={24} />
                            )
                        }
                        onClick={handleSubmit}
                        disabled={loading}
                        >
                        {loading ? "Submitting..." : "Submit"}
                        </Button>
                        </div>
                </div>
            )}
           {userType === 'teacher' && (
                <div>
                    <div data-aos='fade-left' className='flex justify-center sm:justify-end mt-0 md:mt-0 items-center' style={Style}>
                        <h1 className='text-2xl md:text-3xl mx-5 font-semibold py-5 items-center justify-center' style={{color: 'white', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}}>Academic Information</h1>
                    </div>

                    <div  data-aos='fade-right' className='py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                    
                    <CustomTextField
                        label="Last School Attended"
                        value={userData.academic.lastSchoolAttended}
                        onChange={e => handleInputChange(e,'academic')} 
                        name="lastSchoolAttended"
                        required
                        error={errors['lastSchoolAttended']}
                        helperText={errors['lastSchoolAttended']}
                    />
                        <CustomTextField
                            label="School Address"
                            value={userData.academic.schoolAddress}
                            onChange={e => handleInputChange(e, 'academic')} 
                            name="schoolAddress"
                            required
                            error={errors['schoolAddress']}
                            helperText={errors['schoolAddress']}
                        />
                        <CustomDatePicker
                            label="Year Graduated"
                            value={userData.academic.yearGraduated}
                            onChange={(date) => handleDateChange('academic', 'yearGraduated', date)}
                            required
                            yearOnly
                            error={errors['yearGraduated']}
                            helperText={errors['yearGraduated']}
                        />
                        
                        <CustomTextField
                            label="Degree"
                            value={userData.academic.degree}
                            onChange={e => handleInputChange(e, 'academic')} 
                            name="degree"
                            required
                            
                            error={errors['degree']}
                            helperText={errors['degree']}
                        />
                        <CustomTextField
                            label="PRC Number"
                            type="numeric"
                            value={userData.academic.prcNumber}
                            onChange={e => handleInputChange(e, 'academic')} 
                            name="prcNumber"
                            error={errors['prcNumber']}
                            helperText={errors['prcNumber']}
                        />
                        <CustomDatePicker
                            label="Expiration Date"
                            value={userData.academic.expirationDate}
                            onChange={(date) => handleDateChange('academic', 'expirationDate', date)}
                            error={errors['expirationDate']}
                            helperText={errors['expirationDate']}
                        />
                        <CustomTextField
                            label="Years of Teaching"
                            type="numeric"
                            value={userData.academic.yearsOfTeaching}
                            required
                            onChange={e => handleInputChange(e, 'academic')} 
                            name="yearsOfTeaching"
                            error={errors['yearsOfTeaching']}
                            helperText={errors['yearsOfTeaching']}
                        />
                        
                    </div>
                    <div className="flex justify-center mt-5">
                    <Button
                        variant="contained"
                        style={{ background: "#F2B569", color: 'white'}}
                        startIcon={
                            loading && (
                            <CircularProgress size={24} />
                            )
                        }
                        onClick={handleSubmit}
                        disabled={loading}
                        >
                        {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Usersform;