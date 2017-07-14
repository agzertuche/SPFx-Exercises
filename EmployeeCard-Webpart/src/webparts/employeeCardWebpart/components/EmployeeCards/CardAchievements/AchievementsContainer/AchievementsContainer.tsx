import * as React from 'react';
import { IAchievementsContainerProps } from './IAchievementsContainerProps';
import Achievement from '../Achievement';

export default class Achievements extends React.Component<IAchievementsContainerProps, {}>{
  private _renderAchievements(){
    var rows = [];
    this.props.achievements.map(a => {
      rows.push(
        <Achievement id={a.id} icon={a.icon} title={a.title} description={a.description} />
      );
    });    
    
    return (
      <div className="ms-Grid-row">
        { rows }
      </div>                  
    );
  }
  
  public render(): React.ReactElement<IAchievementsContainerProps> {
    return(
      <div className="ms-u-slideUpIn20">
          <div className={'ms-font-l'}>
              <span>Achievements</span>
          </div> 
          { this._renderAchievements() }
      </div>
    );
  }
}