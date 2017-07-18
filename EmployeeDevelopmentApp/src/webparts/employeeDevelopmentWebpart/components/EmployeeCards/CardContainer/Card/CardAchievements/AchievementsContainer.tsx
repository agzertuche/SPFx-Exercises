import * as React from 'react';
import { IAchievementsContainerProps } from './IAchievementsContainerProps';
import Achievement from '../../../../Common/Achievement';

export default class AchievementsContainer extends React.Component<IAchievementsContainerProps, {}>{
  public render(): React.ReactElement<IAchievementsContainerProps> {
    const achievements = this.props.achievements.map((a) => {
      return ( 
        <Achievement key={a.id} id={a.id} icon={a.icon} title={a.title} description={a.description} />
      );
    });

    return(
      <div className="ms-u-slideUpIn20">
          <div className={'ms-font-l'}>
              <span>Achievements</span>
          </div> 
          <div className="ms-Grid-row">
            { 
              achievements.length > 0 ?
              achievements : 
              <div>
                This employee has not earn any achievement... That's sad =(
              </div>
            }
          </div> 
      </div>
    );
  }
}