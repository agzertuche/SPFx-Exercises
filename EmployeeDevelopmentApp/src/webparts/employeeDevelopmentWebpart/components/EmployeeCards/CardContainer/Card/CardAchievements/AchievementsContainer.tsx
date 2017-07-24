import * as React from 'react';
import { IAchievementsContainerProps } from './IAchievementsContainerProps';
import styles from './styles.module.scss';
import Achievement from '../../../../Common/Achievement';
import Placeholder from '../../../../Common/Placeholder';

export default class AchievementsContainer extends React.Component<IAchievementsContainerProps, {}>{
  public render(): React.ReactElement<IAchievementsContainerProps> {
    const achievementsList = this.props.achievements.map((a, index) => {
      // if (index%3 == 0) {
      //   <div key={a.id} className="ms-Grid-row">
      //     <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
      //       <Achievement achievement={a} />
      //     </div>
      //   </div>
      // }
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
    );
  }
}