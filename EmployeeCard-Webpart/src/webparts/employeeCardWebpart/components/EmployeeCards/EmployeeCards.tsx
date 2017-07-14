import * as React from 'react';
import { IEmployeeCardsProps } from './IEmployeeCardsProps';
import { IEmployeeCardsState } from './IEmployeeCardsState';
import { Placeholder } from '@microsoft/sp-webpart-base';
import CardSearch from './CardSearch';
import Card from './Card';

export default class EmployeeCards extends React.Component<IEmployeeCardsProps, IEmployeeCardsState>{
  constructor(props: IEmployeeCardsProps){
    super(props);

    this.state = {
      selectedEmployees: []
    };
  }

  private componentDidMount(): void{
    
  }

  private _renderSelectedEmployees(){
    let employees = [];

    if(!this.state.selectedEmployees){
      //TODO Display no found or look for new employee
      return;
    }

    this.state.selectedEmployees.forEach(e => {
      employees.push(
        //TODO: add key attribute
        <Card userPrincipalName={e} />
      );
    });

    if (employees.length == 0) {
      return (
        <Placeholder
          icon={ 'ms-Icon--ContactCard' }
          iconText='Employee Cards'
          description="No employees selected, please search for any employees and select at least one..." 
        />
      );
    }

    return (
      <div>
        {employees}
      </div>      
    );
  }

  private _handleSelectedEmployees(selectedEmployeesArray: any[]){
    this.setState({
      selectedEmployees: selectedEmployeesArray
    });
  }

  public render(): React.ReactElement<IEmployeeCardsProps>{
    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-u-sm12">
              <CardSearch onSelectedEmployeesChange={this._handleSelectedEmployees.bind(this)} />           
            </div>
          </div>
          <div className="ms-Grid-row ms-u-scaleDownIn100">
            <div className="ms-Grid-col ms-u-sm12">
              {
                this._renderSelectedEmployees()
              } 
            </div>
          </div>
        </div>
      </div>
    );
  }
}