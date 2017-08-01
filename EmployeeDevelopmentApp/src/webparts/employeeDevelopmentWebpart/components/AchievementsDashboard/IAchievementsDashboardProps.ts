import IAchievement from '../../models/IAchievement';
import IUser from '../../models/IUser';

export interface IAchievementsDashboardProps {
  achievements: IAchievement[];
  mostCompleted?: IAchievement[];
  trending?: IAchievement[];
  topAchievers?: IUser[];
}