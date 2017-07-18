import IDataProvider from '../../dataProviders/IDataProvider';
import IUser from '../../models/IUser';

export interface IEmployeeInformationProps {
  dataProvider?: IDataProvider;
  users: IUser[];
}