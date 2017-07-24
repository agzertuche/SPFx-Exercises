import * as React from 'react';
import { AchievementsDashboardProps } from './AchievementsDashboardProps';
import { AchievementsDashboardState } from './AchievementsDashboardState';
import styles from './styles.module.scss';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import Achievement from '../Common/Achievement';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export default class AchievementsDashboard extends React.Component<AchievementsDashboardProps,AchievementsDashboardState>{
  constructor(props: AchievementsDashboardProps) {
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
    let { achievements } = this.props;
    //FIXME: get mostCompletedAchievement from api
    let mostCompletedAchievement = achievements[0];

    return (
      <div className={styles.mostCompletedAchievement}>
        <span className="ms-font-m">
          Most Completed
        </span>
        <Achievement achievement={mostCompletedAchievement} />
        <Achievement achievement={mostCompletedAchievement} />
        <Achievement achievement={mostCompletedAchievement} />
      </div>
    );
  }

  private _trendingCompletedAchievement(){
    let { achievements } = this.props;
    //FIXME: get trendingCompletedAchievement from api
    let trendingCompletedAchievement = achievements[0];

    return (
      <div className={styles.trendingCompletedAchievement}>
        <span className="ms-font-m">
          Trending  
        </span>
        
        <Achievement achievement={trendingCompletedAchievement} />
        <Achievement achievement={trendingCompletedAchievement} />
        <Achievement achievement={trendingCompletedAchievement} />
      </div>
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
    //FIXME: get _topAchievers from api

    const examplePersona = {
      //imageUrl: TestImages.personaFemale,
      imageInitials: 'AL',
      primaryText: 'Annie Lindqvist',
      secondaryText: 'Software Engineer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    };

    const topAchievers = [];
    for (var index = 0; index < 3; index++) {
      topAchievers.push(
        <Persona
          key={index}
          { ...examplePersona }
          size={ PersonaSize.regular }
          presence={ index }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
      );      
    }
    
    return (
      <div className={styles.topAchievers}>
        <span className="ms-font-m">
          Top Achievers
        </span>
        { topAchievers }
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

  public render(): React.ReactElement<AchievementsDashboardProps>{
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