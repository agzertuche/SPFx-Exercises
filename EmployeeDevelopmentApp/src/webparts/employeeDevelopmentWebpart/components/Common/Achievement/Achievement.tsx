import * as React from 'react';
import { IAchievementsProps } from './IAchievementProps';
import IconComponent from '../../Common/IconComponent';
import { Size } from '../../../models/Enums';

export default class Achievements extends React.Component<IAchievementsProps, {}>{
  public render(): React.ReactElement<IAchievementsProps> {
    return(
      <div key={this.props.id} className="ms-Grid-col ms-u-sm12 ms-u-md4">
        <IconComponent iconName={this.props.icon} title={this.props.title} description={this.props.description} size={Size.XXLarge} />  
      </div>
    );
  }
}