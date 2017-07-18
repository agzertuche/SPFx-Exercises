import * as React from 'react';
import { AchievementsDashboardProps } from './AchievementsDashboardProps';
import { AchievementsDashboardState } from './AchievementsDashboardState';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';

export default class AchievementsDashboard extends React.Component<AchievementsDashboardProps,AchievementsDashboardState>{
  constructor(props: AchievementsDashboardProps) {
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      users: this.props.users
    };
  }
  
  private _onFilterChanged(text: string) {
    let { users } = this.props;

    this.setState({
      filterText: text,
      users: text ?
      users.filter(item => item.displayName.toLowerCase().indexOf(text.toLowerCase()) >= 0) :
      users
    });
  }

  public render(): React.ReactElement<{}>{
    let { users: originalItems } = this.props;
    let { users } = this.state;
    let resultCountText = users.length === originalItems.length ? '' : ` (${users.length} of ${originalItems.length} shown)`;

    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">
        <FocusZone direction={ FocusZoneDirection.vertical }>
          <TextField label={ 'Filter by name' + resultCountText } onBeforeChange={ this._onFilterChanged } />
          <List
            items={ users }
            onRenderCell={ (item, index) => (
              <div className='ms-ListBasicExample-itemCell' data-is-focusable={ true }>
                <Image
                  className='ms-ListBasicExample-itemImage'
                  src={ item.thumbnail }
                  width={ 50 }
                  height={ 50 }
                  imageFit={ ImageFit.cover }
                />
                <div className='ms-ListBasicExample-itemContent'>
                  <div className='ms-ListBasicExample-itemName'>{ item.name }</div>
                  <div className='ms-ListBasicExample-itemIndex'>{ `Item ${index}` }</div>
                  <div className='ms-ListBasicExample-itemDesc'>{ item.description }</div>
                </div>
                <Icon
                  className='ms-ListBasicExample-chevron'
                  iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                />
              </div>
            ) }
          />
          </FocusZone>
        </div>
      </div>
    );
  }
}