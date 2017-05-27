import * as React from 'react';
//import styles from '../styles/app.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IIconComponentProps {
  icon: string;
  description: string;
  size: string;
}

export default class Achievements extends React.Component<IIconComponentProps, void>{
  constructor(props: IIconComponentProps){
    super(props);
  }
  
  public render(): React.ReactElement<IIconComponentProps>{
    return(
        // <div className={styles.iconComponentContainer}>
          <div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md2" >
                <Icon iconName={this.props.icon} className={this.props.size} />
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md10 ms-font-s">
                {this.props.description}
              </div>
            </div>
        </div>
    );
  }
}