export interface ILPopoverImageItem {
  src?: string;
  style?: {
    width?: number;
    [key: string]: any;
  };
}
export interface ILPopoverImage {
  preview?: ILPopoverImageItem;
  popover: ILPopoverImageItem;
}
