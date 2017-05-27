import * as React from 'react';
import Search from './Search';

export interface INavProps {}

export default class Nav extends React.Component<INavProps, void>{
    public render(): React.ReactElement<INavProps>{
        return (
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12">
                    <Search/>
                </div>
            </div>
        );
    }
}