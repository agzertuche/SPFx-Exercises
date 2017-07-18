import IUser from '../../models/IUser';

export interface AchievementsDashboardState{
  filterText?: string;
  users?: IUser[];
}