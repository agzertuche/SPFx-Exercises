import * as React from 'react';
import styles from '../styles/app.module.scss';

export interface IIconComponentProps {
  icon: string;
  description: string;
}

export default class Achievements extends React.Component<IIconComponentProps, void>{
  constructor(props: IIconComponentProps){
    super(props);
  }
  
  public render(): React.ReactElement<IIconComponentProps>{
    return(
        <div className={styles.iconComponentContainer}>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                {this.props.icon}
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                {this.props.description}
              </div>
            </div>
        </div>
    );
  }
}