import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';
import IAchievement from '../models/IAchievement';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployees(users: IUser[]): Promise<IEmployee[]>;
  getAchievements();
  getMostCompletedAchievements(): Promise<IAchievement[]>;
  getTrendingAchievements(): Promise<IAchievement[]>;
  getTopAchievers(): Promise<IUser[]>;
}

export default IDataProvider;