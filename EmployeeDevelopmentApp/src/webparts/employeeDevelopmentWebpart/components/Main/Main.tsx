import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { IMainProps, menuItems } from './IMainProps';
import { IMainState } from './IMainState';
import { ComponentStatus, MenuItem } from '../../models/Enums';
import IUser from '../../models/IUser';
import IAchievement from '../../models/IAchievement';
import styles from './styles.module.scss';
import Nav from '../Nav';
import Placeholder from '../Common/Placeholder';
import EmployeeCards from '../EmployeeCards';
import AchievementsDashboard from '../AchievementsDashboard';
import PerformanceDashboard from '../PerformanceDashboard';
import EmployeeInformation from '../EmployeeInformation';

export default class Main extends React.Component<IMainProps, IMainState>{
  private _menuItems: any[];
  
  constructor(props: IMainProps) {
    super(props);

    this._menuItems = menuItems;
    this._updateSelectedComponent = this._updateSelectedComponent.bind(this);

    this.state = {
      selectedUsers: [],
      componentStatus: ComponentStatus.Loading,
      selectedComponent: MenuItem.Cards
    };
  }

  private componentWillMount(): void {
    this.props.dataProvider.getUsers()
    .then((usersArray: IUser[]) => {
      this.setState({
        selectedUsers: usersArray,
        componentStatus: ComponentStatus.Completed,
      });
    })    
    .catch(error => {
      this.setState({
        selectedUsers: [],
        componentStatus: ComponentStatus.Error
      });
    });

    this.props.dataProvider.getAchievements()
    .then((achievementsArray: IAchievement[]) => {
      this.setState({
        selectedUsers: this.state.selectedUsers,
        achievements: achievementsArray
      });
    });

    this.props.dataProvider.getMostCompletedAchievements()
    .then((items: IAchievement[]) => {
      this.setState({
        mostCompleted: items
      });
    });

    this.props.dataProvider.getTrendingAchievements()
    .then((items: IAchievement[]) => {
      this.setState({
        trending: items
      });
    });

    this.props.dataProvider.getTopAchievers()
    .then((users: IUser[]) => {
      this.setState({
        topAchievements: users
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

  private _updateSelectedComponent(item){
    this.setState({
      selectedComponent: item.props.itemKey
    });
  }

  private _renderNavigation(showLinkText: boolean){
    if (showLinkText) {
      this._menuItems = menuItems;
    } else {
      this._menuItems = menuItems.map((i) => {
        return {          
          itemKey: i.itemKey,
          linkText: '',
          itemIcon: i.itemIcon,       
        };
      });
    }

    return(
      <Nav 
        menuItems={ this._menuItems } 
        onNavegationItemChange={ this._updateSelectedComponent }
      />
    );
  }

  private _renderSelectedComponent(){
    switch (this.state.selectedComponent) {
      case MenuItem.Cards:
        return (
          <EmployeeCards 
            dataProvider={this.props.dataProvider} 
            users={this.state.selectedUsers} 
          />
        );
      case MenuItem.Information:
        return (
          <EmployeeInformation 
            users={this.state.selectedUsers} 
          />
        );
      case MenuItem.Achievements:
        return (
          <AchievementsDashboard 
            achievements={this.state.achievements} 
            mostCompleted={ this.state.mostCompleted }
            trending={ this.state.trending }
            topAchievers={ this.state.topAchievements }
          /> 
        );
      case MenuItem.Performance:
        return (
          <PerformanceDashboard /> 
        );
      default:
        return (
          <EmployeeCards 
            dataProvider={this.props.dataProvider} 
            users={this.state.selectedUsers} 
          />
        );
    }
  }

  private _renderApp() {
    return (
      <div>
        <div className={'ms-u-hiddenMdUp'} >
          { this._renderNavigation(false) }
        </div>
        <div className={'ms-u-hiddenSm'} >
          { this._renderNavigation(true) }
        </div>
        <div className={styles.componentSection}>
          { 
            this._renderSelectedComponent()
          }
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