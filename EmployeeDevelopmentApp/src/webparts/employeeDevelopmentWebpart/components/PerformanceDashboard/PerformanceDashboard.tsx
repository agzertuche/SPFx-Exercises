import * as React from 'react';
import { IPerformanceDashboardProps } from './IPerformanceDashboardProps';
import styles from './styles.module.scss';
import ChartContainer from './ChartContainer';
import * as lodash from '@microsoft/sp-lodash-subset';
import { Radar, Line, Doughnut } from 'react-chartjs-2';

export default class PerformanceDashboard extends React.Component<IPerformanceDashboardProps,{}>{
  private _primaryColor =      '#0078D7';
  private _secondaryColor =    '#A3A3A3';
  private _borderColor =       '#FFFFFF';
  private _primaryColorAlpha = 'rgba(199,224,244,.3)';
  
  private _getAverageBySkill(skillName: string){
    let { performanceSkills } = this.props;
    return lodash.sumBy(performanceSkills, skillName) / performanceSkills.length;
  }

  // private _getAverageByEmployee(array: any[], upn: string){
  //   return lodash.sumBy((array, upn) / array.length;
  // }

  private _groupByArray(xs, key) { 
    return xs.reduce((rv, x) => { 
      let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); 
      if (el) { 
        el.values.push(x); 
      } else {
        rv.push({
          key: v, values: [x] }); 
        } 
        return rv; 
      },
    []); 
  } 

  private _getLegendOptions(){
    return {
            display:false
          };
  }

  private _averagePerformanceChart(){    
    let { performanceSkills } = this.props;

    let averagePerformance = 0;
    for (var index = 0; index < performanceSkills.length; index++) {
      var element = performanceSkills[index];
      averagePerformance += (
        element.leadership +
        element.management +
        element.meetingDeadlines +
        element.problemSolving +
        element.teamwork +
        element.technicalKnowledge
      ) / 6;     
    }

    averagePerformance = Math.round(averagePerformance / performanceSkills.length);

    const dataDoughnut = {
      labels: [
        '',
        'Average Performance',
      ],
      datasets: [{
        data: [
          (10 - averagePerformance),
          averagePerformance
        ],
        backgroundColor: [
          this._primaryColorAlpha,
          this._primaryColor,
        ],
        hoverBackgroundColor: [
          this._primaryColorAlpha,
          this._primaryColor,
        ]
      }]
    };

    return (
      <ChartContainer
        title="Average Performance"
        chart={
          <Doughnut 
            data={dataDoughnut}
            legend={this._getLegendOptions()}
          />
        }
      />
    );
  }

  private _skillAverageChart(){
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
      labels: ['Teamwork', 'Problem Solving', 'Leadership', 'Management', 'Meeting Deadlines', 'Thecnical Knowledge'],
      datasets: [
        {
          label: 'Skill Average',
          backgroundColor: this._primaryColorAlpha,
          borderColor: this._primaryColor,
          pointBackgroundColor: this._primaryColor,
          pointBorderColor: this._borderColor,
          pointHoverBackgroundColor: this._borderColor,
          pointHoverBorderColor: this._primaryColor,
          data: [
            this._getAverageBySkill("teamwork"),
            this._getAverageBySkill("problemSolving"),
            this._getAverageBySkill("leadership"),
            this._getAverageBySkill("management"),
            this._getAverageBySkill("meetingDeadlines"),
            this._getAverageBySkill("technicalKnowledge")
          ]
        }        
      ]
    };

    return (
      <ChartContainer
        title="Skill Performance Average"
        chart={
          <Radar 
            data={dataRadar}
            options={optionsRadar}
            legend={this._getLegendOptions()}
          />
        }
      />
    );
  }

  private _skillNormalDistributionChart(){
    // let { performanceSkills } = this.props;

    // let performanceSkillsByEmployee = this._groupByArray(performanceSkills, "userPrincipalName");

    // let averageData = [];
    // performanceSkillsByEmployee.forEach(element => {
    //   averageData.push(this._getAverageByEmployee(element.values, element.key));
    // });    

    
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
      labels: ['Bottom', 'Low', 'Regular', 'Average', 'Remarkable', 'High', 'Top'],
      datasets: [
        {
          label: 'Current',
          data: [1, 2, 6, 9, 4, 3, 1],
          fill: true,
          backgroundColor: this._primaryColorAlpha,
          borderColor: this._primaryColor,        
          pointBorderColor: this._borderColor,
          pointBackgroundColor: this._primaryColor,
          yAxisID: 'y-axis-1'
        },
        {
          label: 'Should be',
          data: [1, 2, 5, 10, 5, 2, 1],
          fill: false,
          borderColor: this._secondaryColor,
          backgroundColor: this._secondaryColor,
          pointBorderColor: this._borderColor,
          pointBackgroundColor: this._secondaryColor,
          yAxisID: 'y-axis-2'
        },
      ]
    };  

    return (
      <ChartContainer
        title="Normal Distribution for Employees Performance"
        chart={
          <Line 
            data={dataLine}
            options={optionsLine}
            legend={this._getLegendOptions()}
            width={600}
          />
        }
      />
    );
  }

  public render(): React.ReactElement<IPerformanceDashboardProps>{
    return (
      <div className={styles.performanceDashboard}>
        <div className="ms-Grid-row ms-u-slideDownIn20">   
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
            { this._averagePerformanceChart() }
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6"> 
            { this._skillAverageChart() }
          </div>             
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12">
            { this._skillNormalDistributionChart() }
          </div>
        </div>
      </div>
    );
  }
}