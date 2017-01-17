declare interface IPhotoGalleryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ImageCountFieldLabel: string;
  ImageWidthFieldLabel: string;
  ImageHeightFieldLabel: string;
  GrayImagesFieldLabel: string;
  CategoryFieldLabel: string;
}

declare module 'photoGalleryStrings' {
  const strings: IPhotoGalleryStrings;
  export = strings;
}
