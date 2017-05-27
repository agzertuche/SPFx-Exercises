import * as React from 'react';
import styles from '../styles/app.module.scss';
import IconComponent from './IconComponent';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

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

const examplePersona = {
  imageUrl: './images/persona-female.png',
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

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

  private _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
        <IconComponent icon={ 'Suitcase' } description={props.secondaryText} size={styles.iconMedium} />
    );
  }
  
  public render(): React.ReactElement<IInformationProps> {
    return(
        // <div className={styles.informationContainer}>
          <div>
            <div className={'ms-font-l'}>
              Information
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12">
               <Persona
                  { ...examplePersona }
                  size={ PersonaSize.extraLarge }
                  presence={ PersonaPresence.online }
                  onRenderSecondaryText={ this._onRenderSecondaryText }
                />
              </div>
            </div>                        
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                <IconComponent icon={"Mail"} description={this.state.email} size={styles.iconXLarge} />
                <IconComponent icon={"Phone"} description={this.state.workPhone} size={styles.iconXLarge} />
                <IconComponent icon={"Cake"} description={this.state.birthday} size={styles.iconXLarge}/>
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                <IconComponent icon={"CellPhone"} description={this.state.mobilePhone} size={styles.iconXLarge}/>
                <IconComponent icon={"ReminderGroup"} description={this.state.emergencyContacts} size={styles.iconXLarge}/>
                <IconComponent icon={"Car"} description={this.state.vehicule} size={styles.iconXLarge}/>
              </div>
            </div>
        </div>
    );
  }
}