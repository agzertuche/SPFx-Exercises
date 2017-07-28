import * as React from 'react';
import { IAchievementsContainerProps } from './IAchievementsContainerProps';
import styles from './styles.module.scss';
import Achievement from '../../../../Common/Achievement';
import Placeholder from '../../../../Common/Placeholder';

export default class AchievementsContainer extends React.Component<IAchievementsContainerProps, {}>{
  public render(): React.ReactElement<IAchievementsContainerProps> {
    const achievementsList = this.props.achievements.map((a, index) => {
      return ( 
        <div key={a.id} className="ms-Grid-col ms-u-sm12 ms-u-md4">
          <Achievement achievement={a} />
        </div>
      );
    });

    return(
      <div className={styles.cardAchievements}>
        <div className={`${styles.title} ms-font-m`}>
          Achievements
        </div> 
        <div className={`${styles.container} ms-Grid-row`}>
          { 
            achievementsList.length > 0 ?
              achievementsList
            : 
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