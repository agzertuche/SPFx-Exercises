import * as React from 'react';
import { ICardInformationProps } from './ICardInformationProps';
import { ICardInformationState } from './ICardInformationState';
import IconComponent, { Size } from '../../Common/IconComponent';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

const examplePersona = {
  // imageUrl: './images/persona-female.png',
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export default class Information extends React.Component<ICardInformationProps, ICardInformationState>{
  constructor(props: ICardInformationProps){
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
        <IconComponent icon={ 'Suitcase' } description={props.secondaryText} />
    );
  }
  
  public render(): React.ReactElement<ICardInformationProps> {
    return(      
      <div className="ms-u-slideRightIn40">
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
              <IconComponent icon={"Mail"} description={this.state.email} size={ Size.XSmall } />
              <IconComponent icon={"Phone"} description={this.state.workPhone} size={ Size.XSmall } />
              <IconComponent icon={"Cake"} description={this.state.birthday} size={ Size.XSmall } />
            </div>
            <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
              <IconComponent icon={"CellPhone"} description={this.state.mobilePhone} size={ Size.XSmall } />
              <IconComponent icon={"ReminderGroup"} description={this.state.emergencyContacts} size={ Size.XSmall } />
              <IconComponent icon={"Car"} description={this.state.vehicule} size={ Size.XSmall } />
            </div>
          </div>
        </div>
    );
  }
}