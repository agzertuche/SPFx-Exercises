import IUser from '../../models/IUser';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import { ComponentStatus, MenuItem } from '../../models/Enums';

export interface IMainState{
  selectedUsers?: IUser[];
  achievements?: IAchievement[];
  performanceSkills?: IPerformanceSkills[];
  componentStatus?: ComponentStatus;
  selectedComponent?: MenuItem;
  mostCompleted?: IAchievement[];
  trending?: IAchievement[];
  topAchievements?: IUser[];
}