import * as React from 'react';
import styles from '../styles/app.module.scss';
import IconComponent from './IconComponent';

export interface IAchievementsProps {}

export default class Achievements extends React.Component<IAchievementsProps, void>{
  public render(): any {
    return(
        <div className={styles.achievementsContainer}>
            <div className="ms-Grid-row">
              <div>
                Achievements
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"Champion"} description={"blah blah blah"} />
              </div>            
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"Happy Customer"} description={"Blah Blah...."} />
              </div>            
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                <IconComponent icon={"Best Raiting"} description={"This that dot..."} />
              </div>    
            </div>
        </div>
    );
  }
}