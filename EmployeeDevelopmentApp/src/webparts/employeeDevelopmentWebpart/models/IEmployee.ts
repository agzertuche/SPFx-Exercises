import IUser from './IUser';
import IEmployeeInformation from './IEmployeeInformation';
import IAchievement from './IAchievement';
import IPerformanceSkills from './IPerformanceSkills';

interface Employee extends IUser, IEmployeeInformation {
  achievements?: IAchievement[];
  performanceSkills?: IPerformanceSkills[];
}

export default Employee;