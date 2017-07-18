import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { ICardPerformanceProps } from './ICardPerformanceProps';

export default class CardPerformance extends React.Component<ICardPerformanceProps, {}>{

  private _printSlider(skillName: string, array: any[]){
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    return (
      <Slider 
        key={skillName}
        label={skillName}
        min={ 0 }
        max={ 10 }
        step={ 1 }
        defaultValue={ average(array) }
        showValue={ true }
        disabled={ true } 
      /> 
    );
  }

  public render(): React.ReactElement<ICardPerformanceProps>{
    let communicationArray = [];
    let creativeArray = [];
    let leadershipArray = [];
    let managementArray = [];
    let meetingDeadlinesArray = [];
    let problemSolvingArray = [];
    let teamworkArray = [];
    let thecnicalKnowledgeArray = [];

    this.props.performanceSkills.forEach(element => {
      communicationArray.push(element.communication);
      creativeArray.push(element.creative);
      leadershipArray.push(element.leadership);
      managementArray.push(element.management);
      meetingDeadlinesArray.push(element.meetingDeadlines);
      problemSolvingArray.push(element.problemSolving);
      teamworkArray.push(element.teamwork);
      thecnicalKnowledgeArray.push(element.thecnicalKnowledge);
    });

    const skills1 = [];
    const skills2 = [];
    skills1.push(this._printSlider("communication",communicationArray));
    skills1.push(this._printSlider("creative",creativeArray));
    skills1.push(this._printSlider("leadership",leadershipArray));
    skills1.push(this._printSlider("management",managementArray));
    skills2.push(this._printSlider("meetingDeadlines",meetingDeadlinesArray));
    skills2.push(this._printSlider("problemSolving",problemSolvingArray));
    skills2.push(this._printSlider("teamwork",teamworkArray));    
    skills2.push(this._printSlider("thecnicalKnowledge",thecnicalKnowledgeArray));

    return (
      <div className="ms-u-slideLeftIn40">
        <div className={'ms-font-l'}>
            Performance
        </div>
        <div className={'ms-Grid-row ms-font-s'}>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-font-s">
            {
              skills1.length > 0 ?
              <div> 
                { skills1 }
              </div>
              :
              <div>
                This employee has not being evaluated yet...
              </div>
            }
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-font-s">
            {
              skills2.length > 0 ?
              <div> 
                { skills2 }
              </div>
              :
              <div>
                This employee has not being evaluated yet...
              </div>
            }
            </div>
        </div>
      </div>
    );
  }
} 