import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';
import IAchievement from '../models/IAchievement';
import IPerformanceSkills from '../models/IPerformanceSkills';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployees(users: IUser[]): Promise<IEmployee[]>;
  getAchievements(): Promise<IAchievement[]>;
  getPerformanceSkills(): Promise<IPerformanceSkills[]>;
  getMostCompletedAchievements(): Promise<IAchievement[]>;
  getTrendingAchievements(): Promise<IAchievement[]>;
  getTopAchievers(): Promise<IUser[]>;
  getEarnedAchievements(): Promise<any[]>;

}

export default IDataProvider;