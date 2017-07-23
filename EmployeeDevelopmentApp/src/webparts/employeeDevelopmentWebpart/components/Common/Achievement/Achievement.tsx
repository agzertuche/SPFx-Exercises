import * as React from 'react';
import { IAchievementProps } from './IAchievementProps';
import styles from './styles.module.scss';
import IconComponent from '../../Common/IconComponent';
import { Size } from '../../../models/Enums';

export default class Achievement extends React.Component<IAchievementProps, {}>{
  public render(): React.ReactElement<IAchievementProps> {
    return(
      <div className={styles.achievement}>
        <IconComponent 
          {...this.props.achievement} 
          size={Size.XXLarge} 
        />  
      </div>
    );
  }
}