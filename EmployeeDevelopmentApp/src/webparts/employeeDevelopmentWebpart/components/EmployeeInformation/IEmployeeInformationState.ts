import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IEmployeeInformationState{
  sortedItems?: any[];
  columns?: IColumn[];
  showModal?: boolean;
}