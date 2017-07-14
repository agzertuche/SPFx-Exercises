import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { ICardPerformanceProps } from './ICardPerformanceProps';

export default class Performance extends React.Component<ICardPerformanceProps, void>{
    public render(): React.ReactElement<ICardPerformanceProps>{
        let overallPerformance = (this.props.personalGrowth 
                                + this.props.professionalGrowth 
                                + this.props.employeeRelationship) 
                                / 3;
        return (
            <div className="ms-u-slideLeftIn40">
                <div className={'ms-font-l'}>
                    Performance
                </div>
                <div className={'ms-font-s'}>
                    Overall: 
                    <Slider
                            min={ 0 }
                            max={ 10 }
                            step={ 1 }
                            defaultValue={ overallPerformance }
                            showValue={ true }
                            disabled={ true }
                            />
                    
                </div>
                <div>
                    <div className={'ms-font-s'}>
                        Personal Growth:
                        <Slider
                            min={ 0 }
                            max={ 10 }
                            step={ 1 }
                            defaultValue={ this.props.personalGrowth }
                            showValue={ true }
                            disabled={ true }
                            />
                    </div>
                    <div className={'ms-font-s'}>
                        Professional Growth:
                        <Slider
                            min={ 0 }
                            max={ 10 }
                            step={ 1 }
                            defaultValue={ this.props.professionalGrowth }
                            showValue={ true }
                            disabled={ true }
                            />
                    </div>
                    <div className={'ms-font-s'}>
                        Employee Relationship:
                        <Slider
                            min={ 0 }
                            max={ 10 }
                            step={ 1 }
                            defaultValue={ this.props.employeeRelationship }
                            showValue={ true }
                            disabled={ true }
                            />
                    </div>
                </div>                
            </div>
        );
    }
} 