import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';

interface IDataProvider {
  webPartContext: IWebPartContext;
  getUsers(): Promise<IUser[]>;
  getEmployees(): Promise<IEmployee[]>;
}

export default IDataProvider;