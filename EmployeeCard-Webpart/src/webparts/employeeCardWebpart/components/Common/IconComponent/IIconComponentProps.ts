export interface IIconComponentProps {
  icon: string;
  title?: string;
  description: string;
  size?: Size;
}

export enum Size {
  XXSmall,
  XSmall,
  Small,
  Medium,
  Large,
  XLarge,
  XXLarge
}