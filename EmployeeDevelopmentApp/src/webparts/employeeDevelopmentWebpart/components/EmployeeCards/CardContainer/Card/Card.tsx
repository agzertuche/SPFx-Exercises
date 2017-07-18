import * as React from 'react';
import { ICardProps } from './ICardProps';
import CardAchievements from './CardAchievements';
import CardInformation from './CardInformation';
import CardPerformance from './CardPerformance';

export default class Card extends React.Component<ICardProps,{}>{
  public render(): React.ReactElement<ICardProps>{
    return (
      <div className="ms-u-fadeIn200"> 
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
            <CardInformation employee={this.props.employee}/>           
          </div>
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
            <CardPerformance performanceSkills={this.props.employee.performanceSkills} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12">
            <CardAchievements achievements={this.props.employee.achievements}/>
          </div>
        </div>
      </div>
    );
  }
}