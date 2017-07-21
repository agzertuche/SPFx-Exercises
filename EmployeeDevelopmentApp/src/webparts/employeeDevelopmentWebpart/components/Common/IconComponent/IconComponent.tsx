import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import styles from './styles.module.scss';
import { IIconComponentProps } from './IIconComponentProps';
import { Size } from '../../../models/Enums';

export default class IconComponent extends React.Component<IIconComponentProps, {}>{
  constructor(props: IIconComponentProps){
    super(props);
  } 

  public static defaultProps: Partial<IIconComponentProps> = {
    size: Size.Medium
  };

  private _renderTitle(){
    if (!this.props.title) {
      return;
    }  

    return(
      <div className={styles.iconTitle} >
        {this.props.title}
      </div>
    );
  }

  public render(): React.ReactElement<IIconComponentProps>{
    let iconSize:any = {
      fontSize: 'xx-large'
    };

    let fontSize:any = {
      fontSize: 'small'
    };

    switch (this.props.size) {
      case Size.XXSmall:
        iconSize = { fontSize: '.7em'};
        fontSize = { fontSize: '.7em'};        
        break;        
      case Size.XSmall:
        iconSize = { fontSize: '.9em'};
        fontSize = { fontSize: '.8em'};        
        break;        
      case Size.Small:
        iconSize = { fontSize: '1.2em'};
        fontSize = { fontSize: '.8em'};        
        break;    
      case Size.Medium:
        iconSize = { fontSize: '1.4em'};
        fontSize = { fontSize: '.9em'};        
        break;            
      case Size.Large:
        iconSize = { fontSize: '2em'};
        fontSize = { fontSize: '.9em'};        
        break;        
      case Size.XLarge:
        iconSize = { fontSize: '2.4em'};
        fontSize = { fontSize: '1em'};        
        break;        
      case Size.XXLarge:
        iconSize = { fontSize: '3em'};
        fontSize = { fontSize: '1em'};        
        break;        
    }

    return(
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm2" >
          <Icon iconName={this.props.iconName} style={iconSize} />
        </div>
        <div className={`ms-Grid-col ms-u-sm10`} style={fontSize}>
          {this._renderTitle()}
          <div>
            {this.props.description}
          </div>            
        </div>
      </div>
    );
  }
}