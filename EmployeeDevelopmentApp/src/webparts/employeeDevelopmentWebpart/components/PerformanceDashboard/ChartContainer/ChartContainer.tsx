import * as React from 'react';
import styles from './styles.module.scss';
import { IChartContainerProps } from './IChartContainerProps';

export default class ChartContainer extends React.Component<IChartContainerProps,{}>{
  public render(): React.ReactElement<{IChartContainerProps}>{
    let { title, chart } = this.props;

    return (
      <div className={styles.chartContainer}>
        <div className={`${styles.title} ms-font-m`}>
          { title }
        </div> 
        <div className={`${styles.container}`}>
          { chart }
        </div>
      </div>
    );
  }
}