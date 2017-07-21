import * as React from 'react';
import { ICardInformationProps } from './ICardInformationProps';
import IconComponent from '../../../../Common/IconComponent';
import { Size } from '../../../../../models/Enums';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export default class CardInformation extends React.Component<ICardInformationProps, {}>{
  private _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
        <IconComponent iconName={ 'Suitcase' } description={props.secondaryText} size={Size.Large} />
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
              { ...this.props.employee }
              primaryText= {this.props.employee.displayName}
              secondaryText={this.props.employee.jobTitle}
              tertiaryText={`${this.props.employee.city}, ${this.props.employee.country}`}
              size={ PersonaSize.extraLarge }
              presence={ PersonaPresence.online }
              onRenderSecondaryText={ this._onRenderSecondaryText }
            />
          </div>
        </div>                        
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
            <IconComponent iconName={"Mail"} description={this.props.employee.mail} size={ Size.Small } />
            <IconComponent iconName={"Phone"} description={this.props.employee.mobilePhone} size={ Size.Small } />
            <IconComponent iconName={"Cake"} description={this.props.employee.birthday} size={ Size.Small } />
            <IconComponent iconName={"Ribbon"} description={this.props.employee.rewardPoints.toString()} size={ Size.Small } />
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
            <IconComponent iconName={"CellPhone"} description={this.props.employee.mobilePhone} size={ Size.Small } />
            <IconComponent iconName={"Hospital"} description={this.props.employee.emergencyContacts} size={ Size.Small } />
            {
              this.props.employee.vehicule && 
              <IconComponent iconName={"Car"} description={this.props.employee.vehicule} size={ Size.Small } />
            }            
            {
              this.props.employee.isHomeOffice ? 
              <IconComponent iconName={"OutOfOffice"} description={"Home Office"} size={ Size.Small } />
              :
              <IconComponent iconName={"EMI"} description={this.props.employee.officeLocation} size={ Size.Small } />
            }            
          </div>
        </div>
      </div>
    );
  }
}