import IUser from '../../models/IUser';
import IEmployee from '../../models/IEmployee';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import { ComponentStatus } from '../../models/Enums';

export interface IMainState{
  users: IUser[];
  employees?: IEmployee[];
  achievements?: IAchievement[];
  performanceSkills?: IPerformanceSkills[];
  componentStatus?: ComponentStatus;
}