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
        return this._renderApp();
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

  private _renderNavigation(showLinkText: boolean){
    const navigationTexts = {
      cards:        showLinkText ? 'Cards' : '',
      information:  showLinkText ? 'Information' : '',
      achievements: showLinkText ? 'Achievements' : '',
      performance:  showLinkText ? 'Performance' : '',
    };

    return(
      <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }>        
        <PivotItem linkText={navigationTexts.cards} itemIcon='ContactCard' className={styles.componentSection}>
          <EmployeeCards 
            dataProvider={this.props.dataProvider} 
            users={this.state.users} 
          />
        </PivotItem>
        <PivotItem linkText={navigationTexts.information} itemIcon='ThumbnailView'>
          <EmployeeInformation 
            users={this.state.users} 
          />
        </PivotItem>
        <PivotItem linkText={navigationTexts.achievements} itemIcon='Trophy' className={styles.componentSection}>             
          <AchievementsDashboard 
            achievements={this.state.achievements} 
          /> 
        </PivotItem>
        <PivotItem linkText={navigationTexts.performance} itemIcon='BarChart4' className={styles.componentSection}>
          <PerformanceDashboard /> 
        </PivotItem>
      </Pivot>    
    );
  }

  private _renderApp() {
    return (
      <div>
        <div className={'ms-u-hiddenMdUp'} >
          {this._renderNavigation(false)}
        </div>
        <div className={'ms-u-hiddenSm'} >
          {this._renderNavigation(true)}
        </div>
      </div>
    );
  }
  
  public render(): React.ReactElement<IMainProps>{
    return (
      <Fabric className={styles.main}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12">
              { this._handleRenderMode() } 
            </div>    
          </div>    
        </div>
      </Fabric>
    );
  }
}