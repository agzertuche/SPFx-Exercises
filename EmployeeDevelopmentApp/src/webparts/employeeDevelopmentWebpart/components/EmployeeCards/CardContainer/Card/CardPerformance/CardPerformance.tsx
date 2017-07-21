import * as React from 'react';
import { ICardPerformanceProps } from './ICardPerformanceProps';
import { Radar } from 'react-chartjs-2';

export default class CardPerformance extends React.Component<ICardPerformanceProps, {}>{
  public render(): React.ReactElement<ICardPerformanceProps>{
    const options = {
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

    const legend = {
      display:false
    };

    const data = {
      labels: ['Teamwork', 'Problem Solving', 'Leadership', 'Management', 'Meeting Deadlines', 'Thecnical Knowledge'],
      datasets: [
        {
          label: 'Current Employee',
          backgroundColor: 'rgba(199,224,244,.3)',
          borderColor: '#0078d7',
          pointBackgroundColor: '#005a9e',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#0078d7',
          data: [6, 8, 10, 8, 9, 7]
        },
        {
          label: 'Employees Average',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: '#a3a3a3',
          pointBackgroundColor: '#a3a3a3',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#a3a3a3',
          data: [7, 7, 9, 7, 9, 8]
        }        
      ]
    };

    return (
      <div className="ms-u-slideLeftIn40">
        <div className={'ms-font-l'}>
            Performance
        </div>
        <div className={'ms-Grid-row ms-font-s'}>
          <div className="ms-Grid-col ms-u-sm12 ms-font-s">
            <Radar 
              data={data}
              options={options}
              legend={legend}
            />
          </div>          
        </div>          
      </div>
    );
  }
} 