import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GoogleChartsWebpart.module.scss';
import * as strings from 'googleChartsWebpartStrings';
import { IGoogleChartsWebpartWebPartProps } from './IGoogleChartsWebpartWebPartProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Log } from '@microsoft/sp-core-library';
import { ChartValue, ChartValues } from './ChartModel';
import ChartData from './ChartData';
import { SPHttpClient } from '@microsoft/sp-http';

export default class GoogleChartsWebpartWebPart extends BaseClientSideWebPart<IGoogleChartsWebpartWebPartProps> {

  public render(): void {

    this.domElement.innerHTML = `<div id="chartContainer"></div>`;
    let wp = this;
    SPComponentLoader.loadScript('https://www.gstatic.com/charts/loader.js',{ globalExportsName: 'google' }).then((google?: any): void => {        
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);      

      function drawChart() {

        var options = {
          width: wp.properties.width,
          height: wp.properties.height,
          legend: wp.properties.legend,
          title: wp.properties.title,
          is3D: wp.properties.is3D
        };

        var chart = null;
        switch (wp.properties.chartType) {
          case 'PieChart':           
            chart = new google.visualization.PieChart(document.getElementById('chartContainer'));
            break;
          case 'AreaChart':           
            chart = new google.visualization.AreaChart(document.getElementById('chartContainer'));
            break;
          case 'BarChart':           
            chart = new google.visualization.BarChart(document.getElementById('chartContainer'));
            break;
          case 'ColumnChart':           
            chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
            break;
          default:
            Log.error("ChartType not found", new Error("Please validate you have selected a valid chart type from the property pane"), wp.context.serviceScope);
            break;
        }         

        if(chart){          
          wp._getData().then((response) => {
            
            var data = new Array();
            response.value.forEach(element => {
              var row = [element.Title, element.Value];
              data.push(row);
            });
            
            chart.draw(google.visualization.arrayToDataTable(data), options);
          });      
        }          
      }
    });
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
                PropertyPaneTextField('title', {
                  label: strings.TitleField
                }),
                 PropertyPaneDropdown('legend', {
                  label: strings.LegendField,
                  options: [
                    {key: 'bottom', text: 'bottom'},
                    {key: 'left', text: 'left'},
                    {key: 'in', text: 'in'},
                    {key: 'none', text: 'none'},
                    {key: 'right', text: 'right'},
                    {key: 'top', text: 'top'}
                  ],
                  selectedKey: "right"
                }),
                 PropertyPaneToggle('is3D', {
                  label: strings.Is3DField
                }),
                 PropertyPaneSlider('width', {
                  label: strings.WidthField,
                  min: 200,
                  max: 1000,
                  step: 1
                }),
                 PropertyPaneSlider('height', {
                  label: strings.HeightField,
                  min: 50,
                  max: 800,
                  step: 1
                }),
                 PropertyPaneDropdown('chartType', {
                  label: strings.ChartTypeField,
                  options: [
                    {key: 'PieChart', text: 'PieChart'},
                    {key: 'AreaChart', text: 'AreaChart'},
                    {key: 'BarChart', text: 'BarChart'},
                    {key: 'ColumnChart', text: 'ColumnChart'}
                  ],
                  selectedKey: "PieChart"
                }),
                 PropertyPaneTextField('title', {
                  label: strings.DataField
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getData(): Promise<ChartValues> {
    return ChartData.get(this.context.pageContext.web.absoluteUrl)
      .then((data: ChartValue[]) => {
          var chartData: ChartValues = { value: data };
          return chartData;
      }) as Promise<ChartValues>;
  }
}
