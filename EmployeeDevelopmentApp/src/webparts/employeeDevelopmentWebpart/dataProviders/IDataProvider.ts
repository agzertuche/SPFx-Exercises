import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployees(users: IUser[]): Promise<IEmployee[]>;
}

export default IDataProvider;