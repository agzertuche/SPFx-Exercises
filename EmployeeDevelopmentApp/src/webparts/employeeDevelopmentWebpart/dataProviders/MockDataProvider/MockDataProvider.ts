import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../../dataProviders/IDataProvider';
import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import { Users } from './Users';
import { Achievements } from './Achievements';
import { EarnedAchievements } from './EarnedAchievements';
import { PerformanceSkills } from './PerformanceSkills';
import { EmployeeInformation } from './EmployeeInformation';

export class MockDataProvider implements IDataProvider {
  private _webPartContext: IWebPartContext;
  private _msTimeout = 500;

  private _getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>(resolve => {
      return setTimeout(() => resolve(Users), this._msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return new Promise<IEmployeeInformation[]>(resolve => {
      return setTimeout(() => resolve(EmployeeInformation), this._msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  } 

  private _getAchievements(): Promise<IAchievement[]> {
    return new Promise<IAchievement[]>(resolve => {
      return setTimeout(() => resolve(Achievements), this._msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve(EarnedAchievements), this._msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve(PerformanceSkills), this._msTimeout);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
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
  
  public getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return this._getEmployeeInformation();
  }

  public getAchievements(): Promise<IAchievement[]> {
    return this._getAchievements();
  }

  public getEarnedAchievements(): Promise<any[]> {
    return this._getEarnedAchievements();
  }

  public getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return this._getPerformanceSkills();
  }  
}