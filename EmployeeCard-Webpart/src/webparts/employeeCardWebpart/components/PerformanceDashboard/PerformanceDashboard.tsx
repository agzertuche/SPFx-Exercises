import * as React from 'react';
import { Placeholder } from '@microsoft/sp-webpart-base';

export default class PerformanceDashboard extends React.Component<{},{}>{
  public render(): React.ReactElement<{}>{
    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">          
          <Placeholder
            icon={ 'ms-Icon--BarChart4' }
            iconText='Performance Dashboard'
            description="Ups!... we couldn't find the Performance list on this site, please make sure it was created when the app was installed." 
          />
        </div>
      </div>
    );
  }
}