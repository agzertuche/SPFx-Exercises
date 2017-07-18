import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';
import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import IUser from '../../models/IUser';
import styles from '../../styles/app.module.scss';
import EmployeeCards from '../EmployeeCards';
import AchievementsDashboard from '../AchievementsDashboard';
import PerformanceDashboard from '../PerformanceDashboard';
import EmployeeInformation from '../EmployeeInformation';

export default class Main extends React.Component<IMainProps, IMainState>{
  constructor(props: IMainProps) {
    super(props);

    this.state = {
      users: []
    };
  }

  private componentDidMount(): void{
    this.props.dataProvider.getUsers()
    .then((usersArray: IUser[]) => {
      this.setState({
        users: usersArray
      });
    });
  }

  private _renderNavigation() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-md12">
          {
            this.state.users.length > 0 &&
            <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }> 
              <PivotItem linkText='Cards' itemIcon='ContactCard'>
                <EmployeeCards dataProvider={this.props.dataProvider} users={this.state.users} />              
              </PivotItem>
              <PivotItem linkText='Information' itemIcon='ThumbnailView'>
                <EmployeeInformation users={this.state.users} />              
              </PivotItem>
              <PivotItem linkText='Achievements' itemIcon='Trophy'>              
                <AchievementsDashboard users={this.state.users} />
              </PivotItem>
              <PivotItem linkText='Performance' itemIcon='BarChart4'>
                <PerformanceDashboard />
              </PivotItem>
            </Pivot>          
          } 
        </div>
      </div>
    );
  }
  
  public render(): React.ReactElement<IMainProps>{
    return (
      <Fabric>
        <div className={`${styles.employeeCardWebPart} ${styles.container}`}>
          <div className={`ms-Grid ms-u-fadeIn500`}>
            {
              this._renderNavigation()
            }
          </div>    
        </div>
      </Fabric>
    );
  }
}