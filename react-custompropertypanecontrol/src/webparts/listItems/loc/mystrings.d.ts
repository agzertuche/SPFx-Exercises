declare interface IListItemsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  ItemFieldLabel: string;
}

declare module 'listItemsStrings' {
  const strings: IListItemsStrings;
  export = strings;
}
