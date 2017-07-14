import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
//import { IEmployeeProps } from '../model/IEmployeeProps';
//service graph sample ->
//https://github.com/microsoftgraph/react-officeuifabric-sample/blob/master/src/helpers/GraphSdkHelper.js
export class EmployeeService {
  private context: IWebPartContext;
  //private props: IEmployeeProps;

//   constructor(_props: IEmployeeProps) {
//     this.props = _props;
//     this.context = _props.context;
//   }

//   public getUserProfileProperties(): Promise<IEmployeeProfile> {
//       return this.context.spHttpClient.get(`https://agzertuche.sharepoint.com/teams/NewTeamSite/_api/SP.UserProfiles.PeopleManager/getmyproperties`, SPHttpClient.configurations.v1 )
//       //return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/getmyproperties`, SPHttpClient.configurations.v1 )
//         .then((response: Response) => {
//             return response.json();
//         });
//   }
}