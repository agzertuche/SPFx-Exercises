import * as React from 'react';
import { IIndicator2Props } from './IIndicator2Props';
import List from '../../Common/List';
import Achievement from '../../Common/Achievement';

const Indicator2: React.StatelessComponent<IIndicator2Props> = (props) => {
  let { achievements, earnedAchievements } = props;

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

  let latestMax = Math.floor(earnedAchievements.length / 3) >= 3 ? Math.floor(earnedAchievements.length / 3) : 3; 

  let groupedAchievements = earnedAchievements.sort((a,b) => {
      return b.id - a.id;
    })
    .slice(0, latestMax);    
  
  let trendingCompletedAchievements = _groupByProperty(groupedAchievements, 'achievementId')
    .slice(0, 3)
    .map(g => {
      return achievements.filter(a => a.id == g.key).pop();
    });

  const items = trendingCompletedAchievements.map((a, index) => {
    return(
      <Achievement 
        key={ index } 
        achievement={ a } 
      />
    );
  });

  return (
    <List 
      title={ "Trending" } 
      items={ items }
    />    
  );
};

export default Indicator2;