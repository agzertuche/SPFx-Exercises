import * as React from 'react';
import { ICardProps } from './ICardProps';
import CardAchievements from '../CardAchievements';
import CardInformation from '../CardInformation';
import CardPerformance from '../CardPerformance';

export default class Card extends React.Component<ICardProps, void>{
  private componentDidMount(): void{
    this._getEmployee();
  }

  private _getEmployee(){
    // TODO get user from graph
  }
  
  private _getEmployeeInformation(){
    // TODO: get performance from employee
    return;
  }
  
  private _getEmployeePerformance(){
    // TODO: get performance from employee
    return  {
      personalGrowth: 9,
      professionalGrowth: 7,
      employeeRelationship: 8,
    };
  }

  private _getAchievementsFromEmployee(){
    //TODO: get employee [this.props.employeeId] achievements from service 
    return [
      { id: 1, icon: "PartyLeader", description: "Leader..."},
      { id: 2, icon: "Emoji", description: "Happy customer..."},
      { id: 3, icon: "FavoriteStarFill", description: "Congratulations..."},
    ];
  }

  public render(): React.ReactElement<ICardProps>{
    return (
      <div className="ms-u-fadeIn200"> 
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
            <CardInformation userPrincipalName={this.props.userPrincipalName}/>                           
          </div>
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
            <CardPerformance personalGrowth={7} professionalGrowth={9} employeeRelationship={5} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12">
            <CardAchievements achievements={this._getAchievementsFromEmployee()}/>
          </div>
        </div>
      </div>
    );
  }
}