import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration,  PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'employeeDevelopmentWebpartStrings';
import { IEmployeeDevelopmentWebpartWebPartProps } from './IEmployeeDevelopmentWebpartWebPartProps';
import { MockDataProvider, MSALDataProvider } from './dataProviders';
import IDataProvider from './dataProviders/IDataProvider';
import Main, { IMainProps } from './components/Main';

export default class EmployeeDevelopmentWebpartWebPart extends BaseClientSideWebPart<IEmployeeDevelopmentWebpartWebPartProps> {
  private dataProvider: IDataProvider;

  protected onInit(): Promise<void> {
    /*
      Create the appropriate data provider depending on where the web part is running.
      The DEBUG flag will ensure the mock data provider is not bundled with the web part
      when you package the solution for distribution, that is,
      using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this.dataProvider = new MockDataProvider();
      // this._dataProvider = new MSALDataProvider();
    } else {
      this.dataProvider = new MSALDataProvider();
      // this._dataProvider = new AxiosDataProvider();
    }

    this.dataProvider.webPartContext = this.context;

    return super.onInit();
  }

  public render(): void {
    const main: React.ReactElement<IMainProps> = React.createElement(
      Main,
      {
        dataProvider: this.dataProvider,
      }
    );

    ReactDom.render(main, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
