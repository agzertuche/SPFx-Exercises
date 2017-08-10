import * as React from 'react';
import { NormalPeoplePicker, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ICardsSearchProps } from './ICardsSearchProps';
import IUser from '../../../models/IUser';

export default class CardsSearch extends React.Component<ICardsSearchProps, {}>{
  constructor(props: ICardsSearchProps){
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onChangeSelection = this._onChangeSelection.bind(this);

    this._peopleList = this._convertUsersToPersonas(props.users);
  }

  private _peopleList: IPersonaProps[];
  private _suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested Employees',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading...',
  };

  private _convertUsersToPersonas(users: IUser[]): IPersonaProps[]{
    return users.map((u) => {
      return {
        ...u,
        primaryText: u.displayName,
        secondaryText: u.jobTitle,
        tertiaryText: u.officeLocation,
        optionalText: u.department,
      };
    });
  }

  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[]) {
    if (!filterText || filterText.length == 0){
      return [];
    }
      
    return this._removeDuplicates(
      this._filterPersonasByText(filterText), 
      currentPersonas
    );
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(u => {
      return (u.primaryText.toUpperCase().indexOf(filterText.toUpperCase()) > -1 ||
      u.secondaryText.toUpperCase().indexOf(filterText.toUpperCase()) > -1);
    });
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }

    return personas.filter(item => item.primaryText.toUpperCase() === persona.primaryText.toUpperCase()).pop();
  }

  private _onChangeSelection(items){
    this.props.onSelectedEmployeesChange(items);
  }
  
  public render(): React.ReactElement<ICardsSearchProps>{   
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        pickerSuggestionsProps={ this._suggestionProps }
        className={ 'ms-PeoplePicker' }
        onChange={ this._onChangeSelection }
      />
    );
  }
}