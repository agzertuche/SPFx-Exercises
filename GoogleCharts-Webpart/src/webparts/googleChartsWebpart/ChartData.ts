import { ChartValue, ChartValues } from './ChartModel';
import { SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export default class ChartData{
    private static _mockValues: ChartValue[] = [
        {Title: "Axis 1", Value: "test"},
        {Title: "Axis 2", Value: 2},
        {Title: "Axis 3", Value: 3},
        {Title: "Axis 4", Value: 4},
        {Title: "Axis 5", Value: 5},
    ];

    public static get(restUrl: string, options?: any): Promise<ChartValue[]>{
        return new Promise<ChartValue[]>((resolve) => {
            resolve(this._mockValues);                   
        });
    }
    
    // private static _getData(restUrl: string): Promise<ChartValues> {
    //     return SPHttpClient.getWebUrlFromRequestUrl(restUrl + `/_api/web/lists?$filter=Hidden eq false`)
    //         .then((response: Response) => {
    //             return response.json();
    //         });
    // }

    // .then(
    //       (data: ChartValue[]) => {
    //         var dataValues: ChartValues = { value: data};
    //         return dataValues;
    //     });

    // Local environment or SharePoint
            // if (Environment.type === EnvironmentType.Local) {
            //     return resolve(this._mockValues);
            // }
            // else if (Environment.type == EnvironmentType.SharePoint || 
            //         Environment.type == EnvironmentType.ClassicSharePoint) {
            //     return resolve(this._mockValues);
            // }     
}
