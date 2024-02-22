import { ColumnOptions } from 'typeorm';

export interface IEntityField {
  name: string;
  type: 'string' | 'number';
  options: ColumnOptions;
}

export type TRelation =
  | 'one-to-one'
  | 'one-to-many'
  | 'many-to-one'
  | 'many-to-many';

export interface IRelationField {
  name: string;
  type: 'relation';
  options: {
    relationType: TRelation;
    ref: string;
    foreignField?: string;
    ownerSide?: boolean;
    cascade?: true;
  };
}

export interface IEntity {
  entityName: string;
  fields: (IEntityField | IRelationField)[];
}

export interface IFooter {
  className: string;
  content: any[];
}

export interface IField {
  value: string;
  entityField: string;
  update?: string;
}

export type TClientRelation = 'addRelation' | 'removeRelation';

export type TActionType =
  | 'variable'
  | 'mutate'
  | 'select'
  | 'create'
  | 'return'
  | 'delete'
  | 'update'
  | TRelation
  | 'parallel'
  | 'condition';

export interface IInsertAction {
  type: 'insert';
  entityName: string;
  fields: { value: string; entityField: string }[];
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface IUpdateAction {
  type: 'update';
  entityName: string;
  fields: { entityField: string; value: string }[];
  where: { [key: string]: any };
  awaitResult?: boolean;
}

export interface IDeleteAction {
  type: 'delete';
  entityName: string;
  where: { [key: string]: any };
  awaitResult?: boolean;
}

export interface IVariableAction {
  type: 'variable';
  name: string;
  value: string;
  as: string;
}

export interface IConditionAction {
  type: 'condition';
  condition: string;
  onMatch: TServerAction[];
  onNotMatch: TServerAction[];
}

export interface IRedirectPageAction {
  clientHandler: 'redirectPage';
  path: string;
}

export type TMessageStatus = 'success' | 'info' | 'warning' | 'error';
export type TMessagePlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ISetMessageAction {
  clientHandler: 'setMessage';
  id: string;
  status: TMessageStatus;
  duration: number;
  placement: TMessagePlacement;
  content: string;
}

export interface ICloseModal {
  clientHandler: 'closeModal';
  id: string;
}

export interface IOpenModal {
  clientHandler: 'openModal';
  id: string;
}

export interface ICloseSidepanel {
  clientHandler: 'closeSidepanel';
  id: string;
}

export interface IOpenSidepanel {
  clientHandler: 'openSidepanel';
  id: string;
}

export interface IRefreshData {
  clientHandler: 'refreshData';
  select: string;
}

export type TClientAction =
  | IRedirectPageAction
  | ISetMessageAction
  | ICloseSidepanel
  | IOpenSidepanel
  | ICloseModal
  | IOpenModal
  | IRefreshData;

export interface IReturnAction {
  type: 'return';
  data?: any;
  config?: TClientAction[];
  multiple?: boolean;
  pagination?: { itemsPerPage: number };
}

export interface ISelectAction {
  type: 'select';
  entityName: string;
  leftJoinAndSelect?: [string, string] | [string, string][];
  where?: { [key: string]: any } | string;
  orderBy?: { [key: string]: 'ASC' | 'DESC' };
  orWhere?: [string, string];
  multiple?: boolean;
  itemsPerPage?: number;
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface IMutateAction {
  type: 'mutate';
  field: string;
  value: string;
}

export interface IAddRelationAction {
  type: 'addRelation';
  entityName: string;
  entityId: string;
  field: string;
  addId: string;
  awaitResult?: boolean;
}

export interface IRemoveRelationAction {
  type: 'removeRelation';
  entityName: string;
  entityId: string;
  field: string;
  removeId: string;
  awaitResult?: boolean;
}

export interface IParallelAction {
  type: 'parallel';
  actions: TServerAction[];
  assignToVar?: string;
  awaitResult?: boolean;
}

export type TServerAction =
  | IInsertAction
  | IReturnAction
  | ISelectAction
  | IMutateAction
  | IAddRelationAction
  | IRemoveRelationAction
  | IVariableAction
  | IUpdateAction
  | IDeleteAction
  | IParallelAction
  | IConditionAction;

export interface IHandler {
  name: string;
  actions: TServerAction[];
}

export interface INavbar {
  className: string;
  content: any[];
}

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

export interface IPages {
  [path: string]: any;
}

export interface ISidepanel {
  id: string;
  width: string;
  placement: 'left' | 'right';
  content: any[];
}
