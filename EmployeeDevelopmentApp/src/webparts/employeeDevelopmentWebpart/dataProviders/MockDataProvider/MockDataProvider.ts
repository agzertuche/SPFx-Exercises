import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../../dataProviders/IDataProvider';
import IUser from '../../models/IUser';
import IEmployee from '../../models/IEmployee';
import { Users } from './Users';
import { Employees } from './Employees';

export class MockDataProvider implements IDataProvider {
  private _users: IUser[];
  private _employees: IEmployee[];
  private _webPartContext: IWebPartContext;

  constructor() {
    this._users = Users;
    this._employees = Employees;
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

  private _getUsers(): Promise<IUser[]> {
    const users: IUser[] = this._users;

    return new Promise<IUser[]>((resolve) => {
      setTimeout(() => resolve(users), 500);
    });
  }

  private _getEmployees(users: IUser[]): Promise<IEmployee[]> {
    const employees: IEmployee[] = this._employees.filter((e) => {
      if(users.filter(u => u.userPrincipalName == e.userPrincipalName).length > 0){
        return e;
      }
    });

    return new Promise<IEmployee[]>((resolve) => {
      setTimeout(() => resolve(employees), 500);
    });
  }
}