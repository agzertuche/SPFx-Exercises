import * as React from 'react';
import styles from '../styles/app.module.scss';
import IconComponent from './IconComponent';
import { Image } from 'office-ui-fabric-react/lib/Image';

export interface IInformationProps {
  //userLoginName: string;
}

export interface IInfromationState {
  firstname?: string;
  lastname?: string;
  displayName?: string;
  email?: string;
  addresss?: string;
  workPhone?: string;
  mobilePhone?: string;
  jobTitle?: string;
  pictureUrl?: string;
  isHomeOffice?: boolean;
  birthday?: any;
  vehicule?: any;
  emergencyContacts?: any;
}

export default class Information extends React.Component<IInformationProps, IInfromationState>{
  constructor(props: IInformationProps){
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      displayName: "",
      email: "",
      addresss: "",
      workPhone: "",
      mobilePhone: "",
      jobTitle: "",
      pictureUrl: "",
      isHomeOffice: false,
      birthday: "",
      vehicule: "",
      emergencyContacts: ""
    };
  }

  public componentDidMount(): void{
    this._getEmployeeInfo();
  }

  private _getEmployeeInfo() {
    // TODO: get employee info from lists or ups
    this.setState({
      firstname: "Arturo",
      lastname: "De la Garza",
      displayName: "Arturo De la Garza",
      email: "agzertuche@hotmail.com",
      addresss: "Calle Del Tigre # 2021",
      workPhone: "12345678",
      mobilePhone: "1234567890",
      jobTitle: "SharePoint Consultant",
      pictureUrl: "https://placehold.it/150x150",
      isHomeOffice: false,
      birthday: "18/09/1985",
      vehicule: "Jetta Gris 2008",
      emergencyContacts: "Gustavo De la Garza"
    });
  }
  
  public render(): React.ReactElement<IInformationProps> {
    return(
        <div className={styles.informationContainer}>
            <div>
              Information
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <Image src={this.state.pictureUrl} width={100}/>                
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md8">
                <div>{this.state.displayName}</div>
                <div>{this.state.addresss}</div>
              </div>
            </div>                        
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                <IconComponent icon={"e-mail"} description={this.state.email} />
                <IconComponent icon={"Work Phone"} description={this.state.workPhone} />
                <IconComponent icon={"Birthday"} description={this.state.birthday} />
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                <IconComponent icon={"Mobile Phone"} description={this.state.mobilePhone} />
                <IconComponent icon={"Emergency Contacts"} description={this.state.emergencyContacts} />
                <IconComponent icon={"Vehicule"} description={this.state.vehicule} />
              </div>
            </div>
        </div>
    );
  }
}