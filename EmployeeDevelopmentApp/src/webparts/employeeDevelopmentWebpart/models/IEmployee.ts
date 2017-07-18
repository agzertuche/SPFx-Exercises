import IUser from './IUser';
import IAchievement from './IAchievement';
import IPerformanceSkills from './IPerformanceSkills';

interface IEmployee extends IUser {
  isHomeOffice: boolean;
  birthday: string;
  vehicule?: string;
  emergencyContacts: string;
  companyPoints: number;
  achievements: IAchievement[];
  performanceSkills: IPerformanceSkills[];
}

export default IEmployee;