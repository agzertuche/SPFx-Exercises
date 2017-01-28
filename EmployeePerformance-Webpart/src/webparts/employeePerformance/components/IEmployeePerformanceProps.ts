import { IWebPartContext  } from '@microsoft/sp-webpart-base';

export interface IEmployeePerformanceProps {
  description: string;
  userLoginName: string;
  context: IWebPartContext;
}
