import * as React from 'react';
import { IPerformanceDashboardProps } from './IPerformanceDashboardProps';
import styles from './styles.module.scss';
import ChartContainer from './ChartContainer';
import * as lodash from '@microsoft/sp-lodash-subset';
import { Radar, Line, Doughnut } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2/lib';
import Placeholder from '../Common/Placeholder';

export default class PerformanceDashboard extends React.Component<IPerformanceDashboardProps,{}>{
  private _primaryColor =      '#0078D7';
  private _secondaryColor =    '#A3A3A3';
  private _borderColor =       '#FFFFFF';
  private _primaryColorAlpha = 'rgba(199,224,244,.3)'; 

  private _getAverageBySkill(skillName: string){
    let { performanceSkills } = this.props;
    return lodash.sumBy(performanceSkills, skillName) / performanceSkills.length;
  }

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

  private _performanceEvaluationCompletion(){    
    
    let { performanceSkills, usersCount } = this.props;

    let performanceSkillsByEmployee = this._groupByArray(performanceSkills, "userPrincipalName");

    let completedPercent = (performanceSkillsByEmployee.length * 100) / usersCount;

    const dataDoughnut = {
      labels: [
        'Pending',
        'Completed',
      ],
      datasets: [{
        data: [
          usersCount - performanceSkillsByEmployee.length,
          performanceSkillsByEmployee.length
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

    // This is need to display the completed percentage on the center of the doughnut chart
    let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function() {
        originalDoughnutDraw.apply(this, arguments);
        
        let chart = this.chart;
        let width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        let fontSize = (height / 100).toFixed(2) + 'em';
        let fontFamily = "Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif";
        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.textBaseline = "middle";

        let text = completedPercent + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
      }
    });


    return (
      <ChartContainer
        title="Performance Evaluation Completion"
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
      },
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
    let { performanceSkills, usersCount } = this.props;
    let bottomCount = 0;
    let lowCount = 0;
    let regularCount = 0;
    let averageCount = 0;
    let remarkableCount = 0;
    let highCount = 0;
    let topCount = 0;    

    let performanceSkillsByEmployee = this._groupByArray(performanceSkills, "userPrincipalName");

    performanceSkillsByEmployee.forEach(emp => {
      let employeeAverage = 0;
      
      emp.values.forEach(ps => {
        employeeAverage += 
          (
            ps.leadership + 
            ps.management + 
            ps.meetingDeadlines + 
            ps.problemSolving + 
            ps.teamwork + 
            ps.technicalKnowledge
          ) / 6;
      });

      employeeAverage = employeeAverage/emp.values.length;

        if (employeeAverage <= 0.5) bottomCount++;
        else if (employeeAverage > 0.5 && employeeAverage <= 1.5) lowCount++;
        else if (employeeAverage > 1.5 && employeeAverage <= 3.5) regularCount++;
        else if (employeeAverage > 3.5 && employeeAverage <= 6.5) averageCount++;
        else if (employeeAverage > 6.5 && employeeAverage <= 8.5) remarkableCount++;
        else if (employeeAverage > 8.5 && employeeAverage <= 9.5) highCount++;
        else if (employeeAverage > 9.5) topCount++;
    });    

    let maxTickValue = Math.max(
      Math.round(usersCount * .3),
      bottomCount,
      lowCount,
      regularCount,
      averageCount,
      remarkableCount,
      highCount,
      topCount
    );

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
            ticks: {
              beginAtZero: true,
              min: 0,
              max: maxTickValue,
            }
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
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              max: maxTickValue,
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
          data: [
            bottomCount,
            lowCount,
            regularCount,
            averageCount,
            remarkableCount,
            highCount,
            topCount
          ],
          fill: true,
          backgroundColor: this._primaryColorAlpha,
          borderColor: this._primaryColor,        
          pointBorderColor: this._borderColor,
          pointBackgroundColor: this._primaryColor,
          yAxisID: 'y-axis-1'
        },
        {
          label: 'Should be',
          data: [
            Math.round(usersCount * .025),
            Math.round(usersCount * .075),
            Math.round(usersCount * .2),
            Math.round(usersCount * .4),
            Math.round(usersCount * .2),
            Math.round(usersCount * .075),
            Math.round(usersCount * .025),
          ],
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
      <div>
        { 
          this.props.performanceSkills.length == 0 ? 
            <div className="ms-Grid-row ms-u-slideDownIn20">
              <div className="ms-Grid-col ms-u-sm12">
                <Placeholder 
                  icon="BarChart4"
                  title="No performance information found..."
                />
              </div>
            </div>
          :
            <div className={styles.performanceDashboard}>
              <div className="ms-Grid-row ms-u-slideDownIn20">   
                <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
                  { this._performanceEvaluationCompletion() }
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
        }
      </div>
    );
  }
}