import { IWebPartContext  } from '@microsoft/sp-webpart-base';

export interface IEmployeePerformanceWebPartProps {
  description: string;
  userLoginName: string;
  context: IWebPartContext;
}
