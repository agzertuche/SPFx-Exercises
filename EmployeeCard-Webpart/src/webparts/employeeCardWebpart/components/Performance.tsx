import * as React from 'react';
//import styles from '../styles/app.module.scss';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';

export interface IPerformanceProps {}

export default class Performance extends React.Component<IPerformanceProps, void>{
    public render(): React.ReactElement<IPerformanceProps>{
        return (
            // <div className={styles.performanceContainer}>
            <div>
                <div className={'ms-font-l'}>
                    Performance
                </div>
                <div>
                    <Rating
                        min={ 1 }
                        max={ 5 }
                        size={ RatingSize.Large }
                        rating={ 4 }
                    />
                    <span> A+ Great</span>
                </div>
                <div>
                    <div className={'ms-font-s'}>
                        Personal Growth
                        <Rating min={ 1 } max={ 10 } size={ RatingSize.Small } rating={ 7 } />
                    </div>
                    <div className={'ms-font-s'}>
                        Professional Growth
                        <Rating min={ 1 } max={ 10 } size={ RatingSize.Small } rating={ 9 } />
                    </div>
                    <div className={'ms-font-s'}>
                        Employee Relationship
                        <Rating min={ 1 } max={ 10 } size={ RatingSize.Small } rating={ 8 } />
                    </div>
                </div>                
            </div>
        );
    }
} 