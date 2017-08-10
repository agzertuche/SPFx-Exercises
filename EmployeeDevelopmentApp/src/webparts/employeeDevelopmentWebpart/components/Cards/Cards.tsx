import * as React from 'react';
import { ICardsProps } from './ICardsProps';
import { ICardsState } from './ICardsState';
import IUser from '../../models/IUser';
import CardsSearch from './CardsSearch';
import CardsList from './CardsList';
import IEmployee from '../../models/IEmployee';
import Placeholder from '../Common/Placeholder';

export default class EmployeeCards extends React.Component<ICardsProps, ICardsState>{
  constructor(props: ICardsProps){
    super(props);
    
    this._updateSelectedUsers = this._updateSelectedUsers.bind(this);

    this.state = {
      selectedEmployees: []
    };
  }

  private _updateSelectedUsers(users: IUser[]){
    return this.props.dataProvider.getEmployees(users)
    .then((employees: IEmployee[]) => {
      this.setState({ 
        selectedEmployees: employees
      });    
    });
  }

  public render(): React.ReactElement<ICardsProps>{
    const { users } = this.props;

    return (
      <div className={`ms-Grid-row ms-u-slideDownIn20`}> 
        <div className="ms-Grid-col ms-u-sm12">
          {
            users.length == 0 ? 
            <Placeholder 
              icon="ContactCard"
              title="No users found..."   
            />
            :
            <div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12">
                  <CardsSearch 
                    onSelectedEmployeesChange={ this._updateSelectedUsers } 
                    users={ this.props.users } 
                  />            
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12">
                  <CardsList employees={ this.state.selectedEmployees }/>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}