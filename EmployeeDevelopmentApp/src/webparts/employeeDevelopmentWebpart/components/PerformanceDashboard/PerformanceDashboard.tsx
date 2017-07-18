import * as React from 'react';

export default class PerformanceDashboard extends React.Component<{},{}>{
  public render(): React.ReactElement<{}>{
    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">          
          Performance Dashboard
        </div>
      </div>
    );
  }
}