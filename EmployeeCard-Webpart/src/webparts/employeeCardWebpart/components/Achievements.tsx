import * as React from 'react';
import styles from '../styles/app.module.scss';
import IconComponent from './IconComponent';

export interface IAchievementsProps {}

export default class Achievements extends React.Component<IAchievementsProps, void>{
  public render(): any {
    return(
        // <div className={styles.achievementsContainer}>
        <div>
            <div className={'ms-font-l'}>
                Achievements
              </div>
            <div className="ms-Grid-row">              
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"PartyLeader"} description={"Leader..."} size={styles.iconXXLarge} />
              </div>            
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"Emoji"} description={"Happy customer..."} size={styles.iconXXLarge}/>
              </div>            
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"FavoriteStarFill"} description={"Congratulations..."} size={styles.iconXXLarge} />
              </div>    
            </div>
        </div>
    );
  }
}