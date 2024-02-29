export interface IModal {
  id: string;
  width: string;
  placement:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-top'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  content: any[];
}
