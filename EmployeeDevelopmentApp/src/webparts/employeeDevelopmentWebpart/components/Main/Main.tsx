import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import { ComponentStatus, MenuItem } from '../../models/Enums';
import IUser from '../../models/IUser';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';
import styles from './styles.module.scss';
import Nav from '../Nav';
import Placeholder from '../Common/Placeholder';
import EmployeeCards from '../Cards';
import Achievements from '../Achievements';
import Performance from '../Performance';
import Information from '../Information';

export default class Main extends React.Component<IMainProps, IMainState>{
  private _menuItems: any[];
  
  constructor(props: IMainProps) {
    super(props);

    this._updateSelectedComponent = this._updateSelectedComponent.bind(this);

    this.state = {
      users: [],
      componentStatus: ComponentStatus.Loading,
      selectedComponent: MenuItem.Cards
    };
  }

  private componentWillMount(): void {
    this.props.dataProvider.getUsers()
    .then((usersArray: IUser[]) => {
      this.setState({
        users: usersArray,
        componentStatus: ComponentStatus.Completed,
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
        achievements: achievementsArray
      });
    });

    this.props.dataProvider.getEarnedAchievements()
    .then((items: any[]) => {
      this.setState({
        earnedAchievements: items
      });
    });

    this.props.dataProvider.getPerformanceSkills()
    .then((skills: IPerformanceSkills[]) => {
      this.setState({
        performanceSkills: skills
      });
    });

    this.props.dataProvider.getPerformanceSkills()
    .then((skills: IPerformanceSkills[]) => {
      this.setState({
        performanceSkills: skills
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
      selectedComponent: parseInt(item.props.itemKey)
    });
  }

  private _renderSelectedComponent(){
    switch (this.state.selectedComponent) {
      case MenuItem.Cards:
        return (
          <EmployeeCards 
            dataProvider={this.props.dataProvider} 
            users={this.state.users} 
          />
        );
      case MenuItem.Information:
        return (
          <Information 
            users={this.state.users} 
          />
        );
      case MenuItem.Achievements:
        return (
          <Achievements 
            achievements={ this.state.achievements } 
            earnedAchievements={ this.state.earnedAchievements }
            users={ this.state.users }
          /> 
        );
      case MenuItem.Performance:
        return (
          <Performance 
            performanceSkills={ this.state.performanceSkills } 
            usersCount={ this.state.users.length }
          /> 
        );
    }
  }

  private _renderApp() {
    return (
      <div>
        <div>
          <Nav onNavegationItemChange={ this._updateSelectedComponent } />
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