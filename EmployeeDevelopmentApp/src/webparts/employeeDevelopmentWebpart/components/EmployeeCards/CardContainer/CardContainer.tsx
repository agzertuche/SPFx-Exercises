import * as React from 'react';
import { ICardContainerProps } from './ICardContainerProps';
import Placeholder from '../../Common/Placeholder';
import Card from './Card';

export default class CardContainer extends React.Component<ICardContainerProps,{}>{
  public render(): React.ReactElement<ICardContainerProps>{
    const cards = this.props.employees.map((e) => {
      if (e){
        return ( <Card key={e.id} employee={e}/> );
      } 
      else {
        return (
          <Placeholder 
            icon="ContactCard" 
            title="Employee not found"
            description="No employee information found for this user..."
          />
        );
      }      
    });

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12">
          {
            cards.length > 0 ? 
              cards 
            : 
              <Placeholder 
                icon="Search"
                title="No employees selected"
                description="Please search for any employees and select at least one..."
              />
          }
        </div>
      </div>
    );
  }
}