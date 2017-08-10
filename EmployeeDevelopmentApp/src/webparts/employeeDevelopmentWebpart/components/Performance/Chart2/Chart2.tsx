import * as React from 'react';
import { Chart2Props } from './IChart2Props';
import ChartComponent from '../../Common/ChartComponent';
import * as lodash from '@microsoft/sp-lodash-subset';
import { Radar } from 'react-chartjs-2';
import styles from './styles.module.scss';

const Chart2: React.StatelessComponent<Chart2Props> = (props) => {
  const { performanceSkills } = props;

  const legend = { display:false };

  const _getAverageBySkill = (skillName: string) => {
    return lodash.sumBy(performanceSkills, skillName) / performanceSkills.length;
  };

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
    },
  };

  const data = {
    labels: ['Teamwork', 'Problem Solving', 'Leadership', 'Management', 'Meeting Deadlines', 'Thecnical Knowledge'],
    datasets: [
      {
        label: 'Skill Average',
        backgroundColor: styles.primaryColorAlpha,
        borderColor: styles.primaryColor,
        pointBackgroundColor: styles.primaryColor,
        pointBorderColor: styles.borderColor,
        pointHoverBackgroundColor: styles.borderColor,
        pointHoverBorderColor: styles.primaryColor,
        data: [
          _getAverageBySkill("teamwork"),
          _getAverageBySkill("problemSolving"),
          _getAverageBySkill("leadership"),
          _getAverageBySkill("management"),
          _getAverageBySkill("meetingDeadlines"),
          _getAverageBySkill("technicalKnowledge")
        ]
      }        
    ]
  };

  return (
    <ChartComponent
      title="Skill Performance Average"
      chart={
        <Radar 
          data={ data }
          options={ options }
          legend={ legend }
        />
      }
    />
  );
};

export default Chart2;