import { ChartValue } from './ChartModel';

export default class ChartMockData{
    private static _mockValues: ChartValue[] = [
        {Title: "Category 1", Value: 10},
        {Title: "Category 2", Value: 30},
        {Title: "Category 3", Value: 5},
        {Title: "Category 4", Value: 40}
    ];

    public static get(restUrl: string, options?: any): Promise<ChartValue[]>{
        return new Promise<ChartValue[]>((resolve) => {
            resolve(this._mockValues);            
        });
    }
}
