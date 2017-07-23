import * as React from 'react';
import { IAchievementsContainerProps } from './IAchievementsContainerProps';
import styles from './styles.module.scss';
import Achievement from '../../../../Common/Achievement';
import Placeholder from '../../../../Common/Placeholder';

export default class AchievementsContainer extends React.Component<IAchievementsContainerProps, {}>{
  public render(): React.ReactElement<IAchievementsContainerProps> {
    const achievements = this.props.achievements.map((a) => {      
      return ( 
        <div key={a.id} className="ms-Grid-col ms-u-sm12 ms-u-md4">
          <Achievement achievement={a} />
        </div>
      );
    });

    return(
      <div className={styles.cardAchievements}>
        <div className={'ms-font-m'}>
          <span>Achievements</span>
        </div> 
        <div className="ms-Grid-row">          
          { 
            achievements.length > 0 ?
            achievements : 
            <Placeholder 
              icon="ReceiptCheck" 
              description="No achievements found for this employee..."
            />              
          }
        </div> 
      </div>
    );
  }
}