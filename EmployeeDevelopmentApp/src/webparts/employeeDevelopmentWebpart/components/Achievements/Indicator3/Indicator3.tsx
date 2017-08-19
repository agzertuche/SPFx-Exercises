import * as React from 'react';
import { IIndicator3Props } from './IIndicator3Props';
import List from '../../Common/List';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import IconComponent from '../../Common/IconComponent';
import { Size } from '../../../models/Enums';
import styles from './styles.module.scss';

const Indicator3: React.StatelessComponent<IIndicator3Props> = (props) => {
  let { achievements, earnedAchievements, users } = props;
  
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

  let topAchievers = _groupByProperty(earnedAchievements, 'userPrincipalName')
    .sort((a,b) => {
      return b.values.length - a.values.length;
    })
    .slice(0, 3)
    .map(g => {
      return users.filter(u => u.userPrincipalName === g.key).pop();
    });    

  const _onRenderSecondaryText = (personaProps: IPersonaProps): JSX.Element => {
    return (
      <IconComponent 
        iconName={ 'Suitcase' } 
        description={ personaProps.secondaryText } 
        size={ Size.Small } 
      />
    );
  };

  let items = topAchievers.map((a, index) => {
    return(
      <Persona
        className={ styles.persona }
        key={ index }
        { ...a }
        primaryText={ a.displayName }
        secondaryText={ a.jobTitle }
        size={ PersonaSize.regular }
        onRenderSecondaryText={ _onRenderSecondaryText }
      />
    );
  });

  return (
    <div className={ styles.indicator3 }> 
      <List 
        title={ "Top Achievers" } 
        items={ items }
      />    
    </div>    
  );
};

export default Indicator3;