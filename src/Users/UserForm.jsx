import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";
import StudentPI from "./formData/studentPI";
import ParentsInfo from "./formData/parentsInfo";

const defaultData = {
    student: {
        studentID: '',
        lastName: '',
        firstName: '',
        middleName: '',
        password: '',
        contactNumber: '',
        address: '',
        gradeLevel: null,
        section: null,
        adviser: null,
        dob: null,
        age: '',
        gender: null,
        parents: {
            mother: {
                mothersName: '',
                mothersContact: '',
                mothersOccupation: '',
                mothersAddress: '',
                dob: null,
                age: '',
            },
            father: {
                fathersName: '',
                fathersContact: '',
                fathersOccupation: '',
                fathersAddress: '',
                dob: null,
                age: '',
            }
        }
    },
    advisers: {
        employeeID: '',
        alastName: '',
        afirstName: '',
        amiddleName: '',
        apassword: '',
        acontactnumber: '',
        aaddress: '',
        dob: null,
        age: '',
        gender: null,

        academicData: {
            lastSchoolAttended: '',
            schoolAddress: '',
            yearGraduated: null,
            degree: '',
            achievements: '',
            prcNumber: '',
            expirationDate: null,
            yearsOfTeaching: '',
        },
        
    },
    
};


const steps = [
  { id: "student" },
  { id: "parents" },
  { id: "review" },
  { id: "submit" },
];

export const MultiStepForm = () => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "student":
      return <StudentPI {...props} />;
    case "parents":
      return <ParentsInfo {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }

  return (
    <div>
      <h1>Student form</h1>
    </div>
  );
};