import * as React from 'react';
import { IMainProps } from './IMainProps';
import Nav from '../Nav';
import styles from '../../styles/app.module.scss';

export default class Main extends React.Component<IMainProps, {}>{
  public render(): React.ReactElement<IMainProps>{
    return (
      <div className={`${styles.employeeCardWebPart} ${styles.container}`}>
        <div className={`ms-Grid ms-u-fadeIn500`}>
          <Nav />
        </div>    
      </div>
    );
  }
}