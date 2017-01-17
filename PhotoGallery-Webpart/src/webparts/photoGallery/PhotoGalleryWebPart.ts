import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import styles from './PhotoGallery.module.scss';
import * as strings from 'photoGalleryStrings';
import { IPhotoGalleryWebPartProps } from './IPhotoGalleryWebPartProps';
const Masonry: any = require('masonry');

export default class PhotoGalleryWebPart extends BaseClientSideWebPart<IPhotoGalleryWebPartProps> {
  private masonry: any = undefined;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <h1>${this.properties.description}</h1>
      <div class="${styles.images}"></div>`;

    for (let i: number = 0; i < this.properties.imageCount; i++) {
      const img: Element = document.createElement('img');

      let isGray: string = this.properties.grayImages ? "/g" : "";

      let maxWidth: number = this.properties.imageWidth; 
      let maxHeight: number = this.getRandomNumber(50, this.properties.imageHeight);

      let category: string = this.properties.category ? `/${this.properties.category}` : "";

      img.setAttribute('src', `http://lorempixel.com${isGray}/${maxWidth}/${maxHeight}${category}/?d=` + new Date().getTime().toString());
      img.setAttribute('width', maxWidth.toString());
      img.setAttribute('height', maxHeight.toString());

      this.domElement
        .querySelector(`div.${styles.images}`)
        .appendChild(img);
    }

    if (this.renderedOnce) {
      this.masonry.destroy();
    }

    this.masonry = new Masonry(this.domElement.querySelector(`div.${styles.images}`), {
      itemSelector: 'img',
      stagger: 30,
      gutter: 10
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider('imageCount', {
                  label: strings.ImageCountFieldLabel,
                  max: 30,
                  min: 4,
                  step: 1,
                  value: 15,
                  showValue: true
                }),
                PropertyPaneSlider('imageWidth', {
                  label: strings.ImageWidthFieldLabel,
                  max: 360,
                  min: 90,
                  step: 90,
                  value: 180,
                  showValue: true
                }),
                PropertyPaneSlider('imageHeight', {
                  label: strings.ImageHeightFieldLabel,
                  max: 400,
                  min: 50,
                  step: 10,
                  showValue: true
                }),
                PropertyPaneToggle('grayImages', {
                  label: "Gray Images?"
                }),
                PropertyPaneDropdown('category', {
                  label: strings.CategoryFieldLabel,
                  options: [
                    { key: '', text: 'None' },
                    { key: 'abstract', text: 'Abstract' },
                    { key: 'animals', text: 'Animals' },
                    { key: 'business', text: 'Business' },
                    { key: 'cats', text: 'Cats' },
                    { key: 'city', text: 'City' },
                    { key: 'food', text: 'Food' },
                    { key: 'nightlife', text: 'Nightlife' },
                    { key: 'fashion', text: 'Fashion' },
                    { key: 'people', text: 'People' },
                    { key: 'nature', text: 'Nature' },
                    { key: 'sports', text: 'Sports' },
                    { key: 'technics', text: 'Technics' },
                    { key: 'transport', text: 'Transport' }
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
