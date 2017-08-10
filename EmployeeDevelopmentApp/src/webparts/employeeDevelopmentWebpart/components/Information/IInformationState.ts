import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IInformationState{
  sortedItems?: any[];
  columns?: IColumn[];
  showModal?: boolean;
}