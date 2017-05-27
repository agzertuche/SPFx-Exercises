import * as React from 'react';
import styles from '../styles/app.module.scss';

export interface IPerformanceProps {}

export default class Performance extends React.Component<IPerformanceProps, void>{
    public render(): React.ReactElement<IPerformanceProps>{
        return (
            <div className={styles.performanceContainer}>
                <div>
                    Performance
                </div>
                <div>
                    Overall chart
                </div>
                <div>   
                    Individual charts
                </div>                
            </div>
        );
    }
} 