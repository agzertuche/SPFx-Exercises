import * as React from 'react';
//import styles from '../styles/app.module.scss';
import Achievements from './Achievements';
import Information from './Information';
import Performance from './Performance';
import Nav from './Nav';

export interface IMainProps {}

export interface IMainState {}

export default class Main extends React.Component<IMainProps,IMainState>{
    public render(): React.ReactElement<IMainProps>{
        return (
            //<div className={styles.mainContainer}>
            <div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12">
                            <Nav/> 
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
                            <Information/>
                        </div>
                        <div className="ms-Grid-col ms-u-sm6 ms-u-md6">
                            <Performance/>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12">
                            <Achievements/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}