import * as React from 'react';
import styles from '../styles/app.module.scss';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';

export interface ISearchProps {
}

export interface ISearchState{
    selectedEmployees: any[];
    allEmployees: any[];
}

export default class Search extends React.Component<ISearchProps, ISearchState>{
    constructor(props: ISearchProps) {
        super(props);

        this.state = {
            selectedEmployees: [],
            allEmployees: []
        };
    }

    public componentDidMount(): void{
        this._getEmployees();
    }

    private _getEmployees(){
        //TODO: get employees from a SP list based on environment local or online
        var employees =  [{key: 0, primaryText: 'John Smith'},
                         {key: 1,primaryText: 'Ann Williams'}, 
                         {key:2, primaryText: 'Sam Contoso'}];
        this.setState({
            allEmployees: employees,
            selectedEmployees: []
        }); 
    }

    private _onFilterChange(filterText, items){
        if(filterText){
            return this.state.allEmployees.filter(x => x.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
            .filter(x => this.state.selectedEmployees.filter(y => y.key === x.key).length === 0);
        } else{
            return this.state.allEmployees;
        }
    }

    private _onChangeSelection(items){
        this.setState(this.state.selectedEmployees = items);
    }
    
    public render(): React.ReactElement<ISearchProps>{
        return (
            <div>
                <NormalPeoplePicker                     
                    onResolveSuggestions={ this._onFilterChange.bind(this) }                    
                    pickerSuggestionsProps={{
                        suggestionsHeaderText: 'Suggested Employees',
                        noResultsFoundText: 'No results found',
                        loadingText: 'Loading...' ,
                    }}
                    onChange={ this._onChangeSelection.bind(this) }
                /> 
            </div>
        );
    }
}