import * as React from 'react';
import { NormalPeoplePicker, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ICardSearchProps } from './ICardSearchProps';
import IUser from '../../../models/IUser';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested Employees',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading...',
};

export default class CardSearch extends React.Component<ICardSearchProps, {}>{
  private _peopleList: IPersonaProps[];

  public componentDidMount(): void{  
    this._peopleList = this._convertUsersToPersonas(this.props.users);
  }

  private _convertUsersToPersonas(users: IUser[]): IPersonaProps[]{
    return users.map((u) => {
      let persona = {
        ...u,
        primaryText: u.displayName,
        secondaryText: u.jobTitle,
        tertiaryText: u.officeLocation,
        optionalText: u.department,
      };
      return persona;
    });
  }

  public _renderPicker() {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged.bind(this) }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        onChange={ this._onChangeSelection.bind(this) }
      />
    );
  }

  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[]) {
    if (filterText && filterText.length > 0) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      return filteredPersonas;
    } else {
      return [];
    }
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(u => u.primaryText.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  private _onChangeSelection(items){
    this.props.onSelectedEmployeesChange(items);
  }
  
  public render(): React.ReactElement<ICardSearchProps>{   
    return (
      <div>
        {
          this._renderPicker()
        }
      </div>      
    );
  }
}