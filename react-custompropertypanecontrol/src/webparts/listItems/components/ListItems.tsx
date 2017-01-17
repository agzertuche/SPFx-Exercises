import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../ListItems.module.scss';
import { IListItemsWebPartProps } from '../IListItemsWebPartProps';

export interface IListItemsProps extends IListItemsWebPartProps {
}

export default class ListItems extends React.Component<IListItemsProps, {}> {
   public render(): JSX.Element {
    return (
      <div className={styles.listItems}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using web parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.listName}
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.item}
              </p>
              <a className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'>
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}