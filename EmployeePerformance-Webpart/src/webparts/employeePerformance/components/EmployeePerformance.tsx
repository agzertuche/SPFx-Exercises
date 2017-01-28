import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from './EmployeePerformance.module.scss';
import { IEmployeePerformanceProps } from './IEmployeePerformanceProps';
import { EmployeePerformanceService } from './EmployeePerformanceService'
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IEmployeePerformanceWebPartState {
  firstName?: string;
  lastname?: string;
  userProfileProperties?: any[];
  isFirstName?: boolean;
  isLastName?: boolean;
  email?: string;
  isWorkPhone?: boolean;
  isDepartment?: boolean;
  displayName?: string;
  pictureUrl?: string;
  workPhone?: string;
  department?: string;
  isPictureUrl?: boolean;
  title?: string;
  office?: string;
  isOffice?: boolean;
}

// export interface IUserProfileProps extends IUserProfileWebPartProps {
// }

export default class EmployeePerformance extends React.Component<IEmployeePerformanceProps, IEmployeePerformanceWebPartState> {

  constructor(props: IEmployeePerformanceProps) {
    super(props);
    this.state = {
      firstName: "",
      lastname: "",
      userProfileProperties: [],
      isFirstName: false,
      isLastName: false,
      email: "",
      workPhone: "",
      department: "",
      pictureUrl: "",
      isPictureUrl: false,
      title: "",
      office: "",
      isOffice: false
    };
  }

  public render(): React.ReactElement<IEmployeePerformanceProps> {
    return (
      <div className={css(styles.employeePerformance)}>
        <div className={css('ms-PersonaCard')}>
          <div className={css('ms-PersonaCard-persona')}>
            <div className={css('ms-Persona ms-Persona--xl')}>
              <div className={css('ms-Persona-imageArea')}>
                <div className={css('ms-Persona-imageCircle')}>
                  <img className={css('ms-Persona-image')} src={this.state.pictureUrl}></img>
                </div>
              </div>
              <div className={css('ms-Persona-details', styles.paddingLeft)}>
                <div className={css('ms-Persona-primaryText')} title={this.state.displayName}>{this.state.displayName}</div>
                <div className={css('ms-Persona-secondaryText')}>{this.state.title}</div>
                <div className={css('ms-Persona-tertiaryText')}>{this.state.office}</div>
              </div>
            </div>
          </div>
          <ul className={css('ms-PersonaCard-actions')}>
            <li id="chat" className={css('ms-PersonaCard-action is-active')}><i className={css('ms-Icon ms-Icon--chat')}></i></li>
            <li id="phone" className={css('ms-PersonaCard-action')}><i className={css('ms-Icon ms-Icon--phone')}></i></li>
            <li id="video" className={css('ms-PersonaCard-action')}><i className={css('ms-Icon ms-Icon--video')}></i></li>
            <li id="mail" className={css('ms-PersonaCard-action')}><i className={css('ms-Icon ms-Icon--mail')}></i></li>
          </ul>
          <div className={css('ms-PersonaCard-actionDetailBox')}>
            <ul id="detailList" className={css('ms-PersonaCard-detailChat')}>
              <li id="chat" className={css('ms-PersonaCard-actionDetails detail-1')}>
                <div className={css('ms-PersonaCard-detailLine')}><span className={css('ms-PersonaCard-detailLabel')}>Skype: </span> <a className={css('ms-Link')} href="#">Start an IM chat</a></div>
              </li>
              <li id="phone" className={css('ms-PersonaCard-actionDetails detail-2')}>

                <div className={css('ms-PersonaCard-detailLine')}><span className={css('ms-PersonaCard-detailLabel')}>Work: </span>{this.state.workPhone}</div>
              </li>
              <li id="video" className={css('ms-PersonaCard-actionDetails detail-3')}>
                <div className={css('ms-PersonaCard-detailLine')}><span className={css('ms-PersonaCard-detailLabel')}>Skype: </span> <a className={css('ms-Link')} href="#">Start a video call</a></div>
              </li>
              <li id="mail" className={css('ms-PersonaCard-actionDetails detail-4')}>

                <div className={css('ms-PersonaCard-detailLine')}><span className={css('ms-PersonaCard-detailLabel')}>Work: </span> <a className={css('ms-Link')} href="mailto:{this.state.email}">{this.state.email}</a></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  public componentWillMount(): void {
    
    SPComponentLoader.loadScript('https://code.jquery.com/jquery-2.1.1.min.js', 'jQuery').then(($: any): void => {
      SPComponentLoader.loadScript('https://agzertuche.sharepoint.com/teams/NewTeamSite/Style%20Library/EmployeePerformance/personacard.js', 'jQuery').then((): void => {
      });
    });

  }

 public componentDidMount(): void {

    this._getProperties();
  }

  private _getProperties(): void {

    const employeePerformanceService: EmployeePerformanceService = new EmployeePerformanceService(this.props);

    employeePerformanceService.getUserProfileProperties().then((response) => {

      this.setState({ userProfileProperties: response.UserProfileProperties });
      this.setState({ email: response.Email });
      this.setState({ displayName: response.DisplayName });
      this.setState({ title: response.Title });

      for (let i: number = 0; i < this.state.userProfileProperties.length; i++) {

        if (this.state.isFirstName == false || this.state.isLastName == false || this.state.isDepartment == false || this.state.isWorkPhone == false || this.state.isPictureUrl == false || this.state.isOffice == false) {

          if (this.state.userProfileProperties[i].Key == "FirstName") {
            this.state.isFirstName = true;
            this.setState({ firstName: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "LastName") {
            this.state.isLastName = true;
            this.setState({ lastname: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "WorkPhone") {
            this.state.isWorkPhone = true;
            this.setState({ workPhone: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "Department") {
            this.state.isDepartment = true;
            this.setState({ department: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "Office") {
            this.state.isOffice = true;
            this.setState({ office: this.state.userProfileProperties[i].Value });
          }
          if (this.state.userProfileProperties[i].Key == "PictureURL") {
            this.state.isPictureUrl = true;
            this.setState({ pictureUrl: this.state.userProfileProperties[i].Value });
          }
        }
      }
    });
  }

}
