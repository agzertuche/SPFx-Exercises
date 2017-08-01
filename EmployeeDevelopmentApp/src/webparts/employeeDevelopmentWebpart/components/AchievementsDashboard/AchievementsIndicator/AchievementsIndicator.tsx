import * as React from 'react';
import { IAchievementsIndicatorProps } from './IAchievementsIndicatorProps';
import styles from './styles.module.scss';
import Placeholder from '../../Common/Placeholder';

export default class AchievementsIndicator extends React.Component<IAchievementsIndicatorProps,{}>{
  public static defaultProps: Partial<IAchievementsIndicatorProps> = {
    amountOfItemsToDisplay: 3
  };
  
  public render(): React.ReactElement<IAchievementsIndicatorProps>{
    let { items, title } = this.props;

    return (
      <div className={styles.achievementsIndicator}>
        <div className={`${styles.title} ms-font-m`}>
          { title }
        </div> 
        <div className={`${styles.container} ms-Grid-row`}>
          { 
            items.length > 0 ?
              items
            : 
            <Placeholder 
              icon="Trophy" 
              description="Data not found..."
            />              
          }
        </div> 
      </div>
    );
  }
}