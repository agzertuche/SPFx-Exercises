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
import { ComponentStatus } from '../../models/Enums';
import IUser from '../../models/IUser';
import IAchievement from '../../models/IAchievement';
import styles from './styles.module.scss';
import Placeholder from '../Common/Placeholder';
import EmployeeCards from '../EmployeeCards';
import AchievementsDashboard from '../AchievementsDashboard';
import PerformanceDashboard from '../PerformanceDashboard';
import EmployeeInformation from '../EmployeeInformation';

export default class Main extends React.Component<IMainProps, IMainState>{
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      users: [],
      componentStatus: ComponentStatus.Loading
    };
  }

  private componentWillMount(): void{
    this.props.dataProvider.getUsers()
    .then((usersArray: IUser[]) => {
      this.setState({
        users: usersArray,
        componentStatus: ComponentStatus.Completed
      });
    })    
    .catch(error => {
      this.setState({
        users: [],
        componentStatus: ComponentStatus.Error
      });
    });

    this.props.dataProvider.getAchievements()
    .then((achievementsArray: IAchievement[]) => {
      this.setState({
        users: this.state.users,
        achievements: achievementsArray
      });
    });
  }

  private _handleRenderMode(){
    switch (this.state.componentStatus) {
      case ComponentStatus.Loading:
        return this._renderLoading();
      case ComponentStatus.Completed:
        return this._renderNavigation();
      case ComponentStatus.Error:
        return this._renderError();
      default:
        return this._renderError();
    }
  }

  private _renderLoading() {
    return (
      <Placeholder
        displaySpinner
        spinnerText={"Loading employees data... please wait."}
      /> 
    );
  }
  
  private _renderError() {
    return (
      <Placeholder
        title={"Ooops! error... .  .   .    .     ."}
        description={"We couldn't find Nemo... sorry =*("}
      />           
    );
  }

  private _renderNavigation() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-md12">
          {
            this.state.users.length > 0 &&
            <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }> 
              <PivotItem linkText='Cards' itemIcon='ContactCard'>
                <div className={styles.componentSection}> 
                  <EmployeeCards dataProvider={this.props.dataProvider} users=  {this.state.users} />              
                </div>
              </PivotItem>
              <PivotItem linkText='Information' itemIcon='ThumbnailView'>
                <EmployeeInformation users={this.state.users} />              
              </PivotItem>
              <PivotItem linkText='Achievements' itemIcon='Trophy'>              
                <div className={styles.componentSection}>
                  <AchievementsDashboard achievements={this.state.achievements} />
                </div>
              </PivotItem>
              <PivotItem linkText='Performance' itemIcon='BarChart4'>
                <div className={styles.componentSection}>
                  <PerformanceDashboard />
                </div>
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
        <div className={styles.main}>
          <div className={`ms-Grid ms-u-fadeIn500`}>
            { this._handleRenderMode() }
          </div>    
        </div>
      </Fabric>
    );
  }
}