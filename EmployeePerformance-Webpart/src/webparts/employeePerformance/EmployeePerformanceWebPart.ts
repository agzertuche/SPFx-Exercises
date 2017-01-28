import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'employeePerformanceStrings';
import EmployeePerformance from './components/EmployeePerformance';
import { IEmployeePerformanceProps } from './components/IEmployeePerformanceProps';
import { IEmployeePerformanceWebPartProps } from './IEmployeePerformanceWebPartProps';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class EmployeePerformanceWebPart extends BaseClientSideWebPart<IEmployeePerformanceWebPartProps> {

  public render(): void {

    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.0.1/fabric.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.0.1/fabric.components.min.css');
    
    const element: React.ReactElement<IEmployeePerformanceProps > = React.createElement(
      EmployeePerformance,
      {
        description: this.properties.description,
        userLoginName: encodeURIComponent('i:0#.f|membership|' + this.context.pageContext.user.loginName),
        context: this.context        
      }
    );

    ReactDom.render(element, this.domElement);
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
