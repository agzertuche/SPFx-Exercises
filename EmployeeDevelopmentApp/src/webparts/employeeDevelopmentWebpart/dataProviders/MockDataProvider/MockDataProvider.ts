import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../../dataProviders/IDataProvider';
import IUser from '../../models/IUser';
import { Users } from './Users';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IEmployee from '../../models/IEmployee';
import IAchievement from '../../models/IAchievement';
import { Achievements } from './Achievements';
import { EarnedAchievements } from './EarnedAchievements';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import { PerformanceSkills } from './PerformanceSkills';
import { EmployeeInformation } from './EmployeeInformation';

export class MockDataProvider implements IDataProvider {
  private _users: IUser[];
  private _achievements: IAchievement[];
  private _employeeInformation: IEmployeeInformation[];
  private _earnedAchievements: any[];
  private _performanceSkills: IPerformanceSkills[];
  private _webPartContext: IWebPartContext;

  constructor() {
    this._users = Users;
    this._achievements = Achievements;
    this._earnedAchievements = EarnedAchievements;
    this._performanceSkills = PerformanceSkills;
    this._employeeInformation = EmployeeInformation;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public getUsers(): Promise<IUser[]> {
    return this._getUsers();
  }

  public getEmployees(users: IUser[]): Promise<IEmployee[]> {
    return this._getEmployees(users);
  }

  public getAchievements(): Promise<IAchievement[]> {
    return this._getAchievements();
  }

  private _getUsers(): Promise<IUser[]> {
    const users: IUser[] = this._users;

    return new Promise<IUser[]>((resolve) => {
      setTimeout(() => resolve(users), 2000);
    });
  }

  private _getUser(upn): IUser{
    const user = this._users.filter((u) => {
      if(u.userPrincipalName == upn){
        return u;
      }
    });

    return user.length > 0 ? user[0] : null;
  }

  private _getEmployees(users: IUser[]): Promise<IEmployee[]> {
    
    const employees: IEmployee[] = users.map(user => {    
      let employeeInfo = this._employeeInformation.filter(e => user.userPrincipalName == e.userPrincipalName);
      if(employeeInfo.length > 0){
        return {
          ...user,
          ...employeeInfo[0],
          achievements: this._getEmployeeAchievements(user.userPrincipalName),
          performanceSkills: this._getEmployeePerformanceSkills(user.userPrincipalName)
        };
      }      
    });
    
    return new Promise<IEmployee[]>((resolve) => {
      setTimeout(() => resolve(employees), 500);
    });
  } 

  private _getAchievements(): Promise<IAchievement[]> {
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(this._achievements), 500);
    });
  }

  private _getAchievement(achievementId): IAchievement{
    const achievement = this._achievements.filter((a) => {
      if(a.id == achievementId){
        return a;
      }
    });

    return achievement.length > 0 ? achievement[0] : null;
  }

  private _getEmployeeAchievements(userPrincipalName: string): IAchievement[] {
    const earnedAchievements = this._earnedAchievements.filter(a => a.userPrincipalName == userPrincipalName);
    
    return this._achievements.filter((a) => {
      return earnedAchievements.some(x => x.id == a.id);
    });
  }

  private _getEmployeePerformanceSkills(userPrincipalName: string): IPerformanceSkills[] {
    return this._performanceSkills.filter(ps => ps.userPrincipalName == userPrincipalName);
  }

  private _groupByArray(xs, key) { 
    return xs.reduce((rv, x) => { 
      let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); 
      if (el) { 
        el.values.push(x); 
      } else {
        rv.push({
          key: v, values: [x] }); 
        } 
        return rv; 
      },
    []); 
  } 

  public getMostCompletedAchievements(): Promise<IAchievement[]>{
    let groupedBy = this._groupByArray(this._earnedAchievements, 'achievementId').sort((a,b) => {
      return b.values.length - a.values.length;
    });

    let achievements: IAchievement[] = groupedBy.map((x) => {
      return this._getAchievement(x.key);
    });
    
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(achievements), 500);
    });
  }

  public getTrendingAchievements(): Promise<IAchievement[]>{
    let groupedBy = this._earnedAchievements.sort((a,b) => {
      return b.id - a.id;
    });
    
    let achievements: IAchievement[] = groupedBy.map((x) => {
      return this._getAchievement(x.achievementId);
    });
    
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(achievements), 500);
    });
  }

  public getTopAchievers(): Promise<IUser[]>{
    let groupedBy = this._groupByArray(this._earnedAchievements, 'userPrincipalName').sort((a,b) => {
      return b.values.length - a.values.length;
    });

    let users: IUser[] = groupedBy.map((x) => {
      return this._getUser(x.key);
    });
    
    return new Promise<IUser[]>((resolve) => {
      setTimeout(() => resolve(users), 500);
    });
  }
}