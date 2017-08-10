import * as React from 'react';
import styles from './styles.module.scss';
import { INavProps } from './INavProps';
import { MenuItem } from '../../models/Enums';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';

const Nav: React.StatelessComponent<INavProps> = (props) => {
  const { onNavegationItemChange, menuItems, selectedItemIndex } = props;

  const _onNavegationItemChange = (item) => {
    onNavegationItemChange(item);
  };

  const pivotItems = menuItems.map(item => {
    return(
      <PivotItem 
        key={ item.itemKey } 
        { ...item } 
      />
    );
  });

  return (
    <div className={ styles.nav }>
      <Pivot 
        linkFormat={ PivotLinkFormat.tabs } 
        linkSize={ PivotLinkSize.large }         
        initialSelectedIndex={ selectedItemIndex }
        headersOnly
        onLinkClick={ _onNavegationItemChange }
      >
        {
          pivotItems
        }
      </Pivot>
    </div>      
  );
};

export default Nav;