import { IEmployeeProfile } from './IEmployeeProfile';
import { IWebPartContext  } from '@microsoft/sp-webpart-base';
import { IEmployeePerformanceProps } from './IEmployeePerformanceProps';
import { SPHttpClient } from '@microsoft/sp-http'

interface IEmployeePerformanceService {
  getUserProfileProperties: Promise<IEmployeeProfile>;
  webAbsoluteUrl: string;
  userLoginName: string;
  context: IWebPartContext;
}

export class EmployeePerformanceService {

  private context: IWebPartContext;
  private props: IEmployeePerformanceProps;

  constructor(_props: IEmployeePerformanceProps) {
    this.props = _props;
    this.context = _props.context;
  }

  public getUserProfileProperties(): Promise<IEmployeeProfile> {
      return this.context.spHttpClient.get(`https://agzertuche.sharepoint.com/teams/NewTeamSite/_api/SP.UserProfiles.PeopleManager/getmyproperties`, SPHttpClient.configurations.v1 )
      //return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/getmyproperties`, SPHttpClient.configurations.v1 )
        .then((response: Response) => {
            return response.json();
        });
  }
}