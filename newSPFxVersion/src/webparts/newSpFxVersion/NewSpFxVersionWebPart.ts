import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'newSpFxVersionStrings';
import NewSpFxVersion from './components/NewSpFxVersion';
import { INewSpFxVersionProps } from './components/INewSpFxVersionProps';
import { INewSpFxVersionWebPartProps } from './INewSpFxVersionWebPartProps';

export default class NewSpFxVersionWebPart extends BaseClientSideWebPart<INewSpFxVersionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewSpFxVersionProps > = React.createElement(
      NewSpFxVersion,
      {
        description: this.properties.description
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
