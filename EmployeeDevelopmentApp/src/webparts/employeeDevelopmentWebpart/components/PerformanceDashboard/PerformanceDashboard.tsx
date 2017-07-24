import * as React from 'react';
import styles from './styles.module.scss';
import { Radar, Line, Doughnut } from 'react-chartjs-2';

export default class PerformanceDashboard extends React.Component<{},{}>{
  public render(): React.ReactElement<{}>{
    const legend = {
      display:false
    };

    const optionsRadar = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 10,
          stepSize: 2
        }
      },
      animation: {
        duration: 2000
      }
    };

    const dataRadar = {
      labels: ['Communication', 'Creative', 'Leadership', 'Management', 'Meeting Deadlines', 'Problem Solving', 'Teamwork', 'Thecnical Knowledge'],
      datasets: [
        {
          label: 'Current Employee',
          backgroundColor: 'rgba(199,224,244,.3)',
          borderColor: '#0078d7',
          pointBackgroundColor: '#005a9e',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#0078d7',
          data: [6, 8, 10, 8, 9, 7, 8, 9]
        },
        {
          label: 'Employees Average',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: '#a3a3a3',
          pointBackgroundColor: '#a3a3a3',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#a3a3a3',
          data: [7, 7, 9, 7, 9, 8, 9, 8]
        }        
      ]
    };

    const optionsLine = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };

    const dataLine = {
      labels: ['Bottom', 'Low', 'Regular', 'Average', 'Best', 'High', 'Top'],
      datasets: [{
        label: 'Should be',
        data: [1, 2, 5, 10, 5, 2, 1],
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-2'
      },{
        label: 'Current',
        data: [1, 2, 6, 11, 5, 3, 2],
        fill: true,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
      }]
    };

    const dataDoughnut = {
      labels: [
        '',
        'Average',
      ],
      datasets: [{
        data: [1, 9],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

    return (
      <div className={styles.performanceDashboard}>
        <div className="ms-Grid-row ms-u-slideDownIn20">   
          <div className="ms-Grid-col">
            <div className="ms-Grid-row">         
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                <Doughnut 
                  data={dataDoughnut}
                  legend={legend}
                />
              </div>
               <div className="ms-Grid-col ms-u-sm12 ms-u-md6"> 
                <Radar 
                  data={dataRadar}
                  options={optionsRadar}
                  legend={legend}
                />
               </div>             
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col">
                <Line 
                  data={dataLine}
                  options={optionsLine}
                  legend={legend}
                  width={600}
                />
              </div>
            </div>
          </div>      
        </div>
      </div>
    );
  }
}