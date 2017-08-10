import * as React from 'react';
import styles from './styles.module.scss';
import { IChartComponentProps } from './IChartComponentProps';

const ChartComponent: React.StatelessComponent<IChartComponentProps> = (props) => {
  let { title, chart } = props;
  return (
    <div className={ styles.chartComponent }>
      <div className={` ${ styles.title } ms-font-m` }>
        { title }
      </div> 
      <div className={` ${ styles.container } `}>
        { chart }
      </div>
    </div>
  );
};

export default ChartComponent;