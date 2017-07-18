import * as React from 'react';
import { IAchievementsProps } from './IAchievementProps';
import IconComponent, { Size } from '../../Common/IconComponent';

export default class Achievements extends React.Component<IAchievementsProps, {}>{
  public render(): React.ReactElement<IAchievementsProps> {
    return(
      <div key={this.props.id} className="ms-Grid-col ms-u-sm12 ms-u-md4">
        <IconComponent icon={this.props.icon} title={this.props.title} description={this.props.description} size={Size.XXLarge} />  
      </div>
    );
  }
}