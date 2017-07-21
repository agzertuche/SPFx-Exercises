import * as React from 'react';
import { IEmployeeCardsProps } from './IEmployeeCardsProps';
import { IEmployeeCardsState } from './IEmployeeCardsState';
import IUser from '../../models/IUser';
import CardSearch from './CardSearch';
import CardContainer from './CardContainer';
import IEmployee from '../../models/IEmployee';

export default class EmployeeCards extends 
React.Component<IEmployeeCardsProps, IEmployeeCardsState>{
  constructor(props: IEmployeeCardsProps){
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

  public render(): React.ReactElement<IEmployeeCardsProps>{
    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-u-sm12">
              <CardSearch 
                onSelectedEmployeesChange={this._updateSelectedUsers} 
                users={this.props.users} 
              />            
            </div>
          </div>
          <div className="ms-Grid-row ms-u-scaleDownIn100">
            <div className="ms-Grid-col ms-u-sm12">
              <CardContainer employees={this.state.selectedEmployees}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}