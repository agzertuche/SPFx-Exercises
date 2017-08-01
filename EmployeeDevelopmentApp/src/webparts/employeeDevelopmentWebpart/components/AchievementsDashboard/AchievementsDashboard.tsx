import * as React from 'react';
import { IAchievementsDashboardProps } from './IAchievementsDashboardProps';
import { IAchievementsDashboardState } from './IAchievementsDashboardState';
import styles from './styles.module.scss';
import AchievementsIndicator from './AchievementsIndicator';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import Achievement from '../Common/Achievement';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export default class AchievementsDashboard extends React.Component<IAchievementsDashboardProps,IAchievementsDashboardState>{
  constructor(props: IAchievementsDashboardProps) {
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onRenderSecondaryText = this._onRenderSecondaryText.bind(this);

    this.state = {
      filterText: '',
      filteredAchievements: this.props.achievements
    };
  }
  
  private _onFilterChanged(text: string) {
    let { achievements } = this.props;

    this.setState({
      filterText: text,
      filteredAchievements: text ?
      achievements.filter(item => 
        item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
        item.description.toLowerCase().indexOf(text.toLowerCase()) >= 0
      ) :
      achievements
    });
  }

  private _mostCompletedAchievement(){
    let { mostCompleted } = this.props;
    const mostCompletedAchievement = mostCompleted.slice(0,3);

    const items = mostCompletedAchievement.map((a, index) => {
      return(
        <Achievement key={index} achievement={a} />
      );
    });

    return (
      <AchievementsIndicator title="Most Completed" items={ items } />
    );
  }

  private _trendingCompletedAchievement(){
    let { trending } = this.props;    
    let trendingCompletedAchievement = trending.slice(0,3);

    const items = trendingCompletedAchievement.map((a, index) => {
      return(
        <Achievement key={index} achievement={a} />
      );
    });

    return (
      <AchievementsIndicator title="Trending" items={ items } />
    );
  }

  private _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
      <div>
        <Icon iconName={ 'Suitcase' } className={ 'ms-JobIconExample' } />
        { props.secondaryText }
      </div>
    );
  }

  private _topAchievers(){
    let { topAchievers } = this.props;
    let items = topAchievers.slice(0,3).map((a, index) => {
      return(
        <Persona
          key={index}
          { ...a }
          primaryText={a.displayName}
          secondaryText={a.jobTitle}
          size={ PersonaSize.regular }
          presence={ index }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
      );
    });
    
    return (
      <div className={styles.topAchievers}>
        <AchievementsIndicator title="Top Achievers" items={ items } />
      </div>
    );
  }

  private _filterAchievementsContainer(){
    let { achievements: originalItems } = this.props;
    let { filteredAchievements } = this.state;
    let resultCountText = filteredAchievements.length === originalItems.length ? '' : ` (${filteredAchievements.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone className={styles.allAchievements} direction={ FocusZoneDirection.vertical }>
        <span className="ms-font-m">
          All Achievements
        </span>
        <TextField 
          placeholder="Type to filter achievements" 
          onBeforeChange={ this._onFilterChanged } 
          description={resultCountText}
        />
        <List
          items={ filteredAchievements }
          onRenderCell={ (item , index) => (
            <Achievement key={item.id} achievement={item} />
          )}
        />
      </FocusZone>
    );
  }

  public render(): React.ReactElement<IAchievementsDashboardProps>{
    let { achievements: originalItems } = this.props;
    let { filteredAchievements } = this.state;
    let resultCountText = filteredAchievements.length === originalItems.length ? '' : ` (${filteredAchievements.length} of ${originalItems.length} shown)`;

    return (
      <div className={styles.achievementsDashboard}>
        <div className="ms-Grid-row ms-u-slideDownIn20">   
          <div className={`${styles.container} ms-Grid-col ms-u-sm12`}>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                { this._mostCompletedAchievement() }
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                { this._trendingCompletedAchievement() }
              </div>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
                { this._topAchievers() }                
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12">
                { this._filterAchievementsContainer() }
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}