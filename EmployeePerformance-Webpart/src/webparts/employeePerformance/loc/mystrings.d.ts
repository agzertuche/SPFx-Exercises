declare interface IEmployeePerformanceStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'employeePerformanceStrings' {
  const strings: IEmployeePerformanceStrings;
  export = strings;
}
