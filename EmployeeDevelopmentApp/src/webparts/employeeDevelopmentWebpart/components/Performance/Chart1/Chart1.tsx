import * as React from 'react';
import { Chart1Props } from './IChart1Props';
import ChartComponent from '../../Common/ChartComponent';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2/lib';
import styles from './styles.module.scss';

const Chart1: React.StatelessComponent<Chart1Props> = (props) => {
  const { performanceSkills, usersCount } = props;

  const legend = { display:false };

  const _groupByProperty = (xs, key) => { 
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
  };

  let performanceSkillsByEmployee = _groupByProperty(performanceSkills, "userPrincipalName");
  let completedPercent = (performanceSkillsByEmployee.length * 100) / usersCount;

  const data = {
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
        styles.primaryColorAlpha,
        styles.primaryColor
      ],
      hoverBackgroundColor: [
        styles.primaryColorAlpha,
        styles.primaryColor
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
    <ChartComponent
      title="Performance Evaluation Completion"
      chart={
        <Doughnut 
          data={ data }
          legend={ legend }
        />
      }
    />
  );
};

export default Chart1;