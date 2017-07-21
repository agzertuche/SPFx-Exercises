import * as React from 'react';
import { AchievementsDashboardProps } from './AchievementsDashboardProps';
import { AchievementsDashboardState } from './AchievementsDashboardState';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import IconComponent from '../Common/IconComponent';
import { Size } from '../../models/Enums';
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
      <IconComponent {...mostCompletedAchievement} size={Size.XXLarge} />
    );
  }

  private _trendingCompletedAchievement(){
    let { achievements } = this.props;
    //FIXME: get trendingCompletedAchievement from api
    let trendingCompletedAchievement = achievements[0];

    return (
      <IconComponent {...trendingCompletedAchievement} size={Size.XXLarge} />
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
    for (var index = 0; index < 5; index++) {
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
        topAchievers
    );
  }

  private _filterAchievementsContainer(){
    let { achievements: originalItems } = this.props;
    let { filteredAchievements } = this.state;
    let resultCountText = filteredAchievements.length === originalItems.length ? '' : ` (${filteredAchievements.length} of ${originalItems.length} shown)`;

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <TextField 
          placeholder="Type to filter achievements" 
          onBeforeChange={ this._onFilterChanged } 
          description={resultCountText}
        />
        <List
          items={ filteredAchievements }
          onRenderCell={ (item , index) => (
            <div data-is-focusable={ true }>
              <IconComponent {...item} size={Size.XXLarge} />
            </div>
          )}
        />
      </FocusZone>
    );
  }

  public render(): React.ReactElement<{}>{
    let { achievements: originalItems } = this.props;
    let { filteredAchievements } = this.state;
    let resultCountText = filteredAchievements.length === originalItems.length ? '' : ` (${filteredAchievements.length} of ${originalItems.length} shown)`;

    return (
      <div className="ms-Grid-row ms-u-slideDownIn20">   
        <div className="ms-Grid-col ms-u-sm12 ms-u-md8">
          <div className="ms-Grid-row">         
            <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
              { this._mostCompletedAchievement() }
            </div>
            <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
              { this._trendingCompletedAchievement() }
            </div>            
          </div>
          <div className="ms-Grid-row">         
            <div className="ms-Grid-col ms-u-sm12">
              { this._filterAchievementsContainer() }
            </div>
          </div>
        </div>
        <div className="ms-Grid-col ms-u-sm12 ms-u-md4">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col">
              { this._topAchievers() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}