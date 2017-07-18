import IEmployee from '../../models/IEmployee';
import { Users } from './Users';
import PerformanceSkills from './PerformanceSkills';
import { Achievements } from './Achievements';

const Emp = {
  0:{
    isHomeOffice: false,
    birthday: "01/01/1985",
    vehicule: "Classic White 17",
    emergencyContacts: "John Snow - 555-0000",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[1],
    performanceSkills: PerformanceSkills,
  },
  1:{
    isHomeOffice: true,
    birthday: "12/12/1976",
    vehicule: "Volvo Darkgrey 2008",
    emergencyContacts: "Jay Lemus - 555-4444",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[2],
    performanceSkills: PerformanceSkills,
  },
  2:{
    isHomeOffice: false,
    birthday: "06/06/1980",
    emergencyContacts: "Marth Kent - 555-9999",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[3],
    performanceSkills: PerformanceSkills,
  },
  3:{
    isHomeOffice: false,
    birthday: "07/07/2000",
    vehicule: "Bently Yellow 2000",
    emergencyContacts: "Dark Knight - +1 111-888-3333",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[4],
    performanceSkills: PerformanceSkills,
  },
  4:{
    isHomeOffice: true,
    birthday: "03/01/1988",
    emergencyContacts: "Elvis Preasly - 101-8787",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[5],
    performanceSkills: PerformanceSkills,
  },
  5:{
    isHomeOffice: false,
    birthday: "09/09/1994",
    vehicule: "BMW Blue 2014",
    emergencyContacts: "Karl Jr - 555-5555",
    companyPoints: Math.floor(Math.random() * 100 + 1),
    achievements: Achievements[6],
    performanceSkills: PerformanceSkills,
  },
};

export const Employees: IEmployee[] =[
  {
    ...Users[0],
    ...Emp[0]
  },
  {
    ...Users[1],
    ...Emp[1]
  },
  {
    ...Users[2],
    ...Emp[2]
  },
  {
    ...Users[3],
    ...Emp[3]
  },
  {
    ...Users[4],
    ...Emp[4]
  },
  {
    ...Users[5],
    ...Emp[5]
  },
];