import * as React from 'react';
import styles from './styles.module.scss';
import { INavProps } from './INavProps';
import { INavState } from './INavState';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';
import { MenuItem } from '../../models/Enums';

export default class Nav extends React.Component<INavProps, INavState>{
  constructor(props: INavProps) {
    super(props);

    this._onNavegationItemChange = this._onNavegationItemChange.bind(this);

    this.state = {
      selectedItem: MenuItem.Cards
    };
  }

  private _onNavegationItemChange(item){
    this.setState({
      selectedItem: item.props.itemKey
    });

    this.props.onNavegationItemChange(item);
  }
  
  public render(): React.ReactElement<INavProps>{
    const { menuItems } = this.props;
    const { selectedItem } = this.state;

    const pivotItems = menuItems.map((item) => {
      return(
        <PivotItem key={item.itemKey} {...item} />
      );
    });

    return (
      <div className={styles.nav}>
        <Pivot 
          linkFormat={ PivotLinkFormat.tabs } 
          linkSize={ PivotLinkSize.large }         
          initialSelectedKey={ selectedItem.toString() }
          headersOnly
          onLinkClick={ this._onNavegationItemChange }
        >
          {
            pivotItems
          }
        </Pivot>
      </div>      
    );
  }
}