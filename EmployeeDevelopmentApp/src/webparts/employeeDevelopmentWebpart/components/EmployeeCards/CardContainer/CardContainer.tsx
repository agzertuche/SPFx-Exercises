import * as React from 'react';
import { ICardContainerProps } from './ICardContainerProps';
import Card from './Card';

export default class CardContainer extends React.Component<ICardContainerProps,{}>{
  public render(): React.ReactElement<ICardContainerProps>{
    const cards = this.props.employees.map((e) =>{
      return (
        <Card key={e.id} employee={e}/>
      );
    });

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12">
          {
            cards.length > 0 ? 
            cards : 
            (
              <div>
                No employees selected, please search for any employees and select at least one...
              </div>
            ) 
          }
        </div>
      </div>
    );
  }
}