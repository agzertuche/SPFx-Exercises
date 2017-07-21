import * as React from 'react';
import styles from './styles.module.scss';
import { IPlaceholderProps } from './IPlaceholderProps';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react';

export default class Placeholder extends React.Component<IPlaceholderProps, {}>{
  public static defaultProps: Partial<IPlaceholderProps> = {
    icon: "Error",
    displaySpinner: false,
    spinnerText: "Loading..."
  };

  public render(): React.ReactElement<IPlaceholderProps> {
    let displayTitleRow = this.props.title || this.props.description;
    return(
      <div className={styles.placeholder}>
        <div className={`ms-Grid-row ${styles.container}`}>
          <div className="ms-Grid-col ms-u-sm12">          
            { 
              displayTitleRow && 
              <div className={`ms-Grid-row ${styles.title}`}>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md2">
                  <Icon className={styles.icon} iconName={this.props.icon} />
                  </div>
                  <div className={`ms-Grid-col ms-u-sm12 ms-u-md10`}>
                  <h2>{this.props.title}</h2>
                  <p>
                    {this.props.description}
                  </p>
                </div>
              </div>
            }
            {
              this.props.displaySpinner && 
              <div className="ms-Grid-row">
                <Spinner className={styles.spinner} size={ SpinnerSize.large } label={this.props.spinnerText} />
              </div>
            }            
          </div>  
        </div>
      </div>
    );
  }
}