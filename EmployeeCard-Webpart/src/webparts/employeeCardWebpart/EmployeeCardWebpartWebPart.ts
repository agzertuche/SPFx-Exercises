import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'employeeCardWebpartStrings';
import Main from './components/Main';
import { IEmployeeCardWebpartWebPartProps } from './IEmployeeCardWebpartWebPartProps';

export default class EmployeeCardWebpartWebPart extends BaseClientSideWebPart<IEmployeeCardWebpartWebPartProps> {
  protected onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Test");

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the solution for distribution, that is, using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      //this._dataProvider = new MockDataProvider();
    } else {
     //this._dataProvider = new SharePointDataProvider();
      //this._dataProvider.webPartContext = this.context;
    }

    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    return super.onInit();   
  }

  public render(): void {    
    ReactDom.render(React.createElement(Main), this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
