import IPerformanceSkills from '../../models/IPerformanceSkills';

const skills: IPerformanceSkills = 
{
  communication:  Math.floor(Math.random() * 10) + 1,
  thecnicalKnowledge:  Math.floor(Math.random() * 10) + 1,
  teamwork:  Math.floor(Math.random() * 10) + 1,
  meetingDeadlines:  Math.floor(Math.random() * 10) + 1,
  problemSolving:  Math.floor(Math.random() * 10) + 1,
  leadership:  Math.floor(Math.random() * 10) + 1,
  creative:  Math.floor(Math.random() * 10) + 1,
  management:  Math.floor(Math.random() * 10) + 1
};

const PerformanceSkills = [];
for (var index = 0; index < 10; index++) {
  PerformanceSkills[index] = skills;  
}

export default PerformanceSkills;