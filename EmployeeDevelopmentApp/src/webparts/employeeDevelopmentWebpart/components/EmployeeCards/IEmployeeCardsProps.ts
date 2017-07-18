import IUser from '../../models/IUser';
import IDataProvider from '../../dataProviders/IDataProvider';

export interface IEmployeeCardsProps{
  users: IUser[];
  dataProvider: IDataProvider;
}