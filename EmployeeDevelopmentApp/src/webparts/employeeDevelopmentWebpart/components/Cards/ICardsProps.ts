import IUser from '../../models/IUser';
import IDataProvider from '../../dataProviders/IDataProvider';

export interface ICardsProps{
  users: IUser[];
  dataProvider: IDataProvider;
}