export type TRelation = 'addRelation' | 'removeRelation';

export interface ITableRecordCreateAction {
  type: 'insert';
  table: string;
  data: string | { [field: string]: string | number };
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface ITableRecordUpdateAction {
  type: 'update';
  update: string;
  set: { [field: string]: string } | string;
  where?: { condition: string; data: { [key: string]: any } | string };
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface ITableRecordDeleteAction {
  type: 'delete';
  from?: { table: string; alias?: string };
  where?: { condition: string; data: { [key: string]: any } | string };
  awaitResult?: boolean;
  assignToVar?: string;
}

export interface IVariableDefineAction {
  type: 'variable';
  name: string;
  value: string;
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

export interface ITableDataSelectAction {
  type: 'select';
  leftJoinAndSelect?:
    | { column: string; table: string }
    | { column: string; table: string }[];
  where?: { condition: string; data: { [key: string]: any } | string };
  orderBy?: { [key: string]: 'ASC' | 'DESC' };
  orWhere?: [string, string];
  multiple?: boolean;
  itemsPerPage?: number;
  assignToVar?: string;
  awaitResult?: boolean;
  select?: { column: string; alias: string }[] | string;
  from?: { table: string; alias?: string };
  leftJoin?: { table: string; condition: string };
  groupBy?: string;
  getRawMany?: boolean;
  getMany?: boolean;
  getManyAndCount?: boolean;
  getOne?: boolean;
}

export interface IVariableUpdateAction {
  type: 'mutate';
  variable: string;
  value: string;
}

export interface ITableRelationAction {
  type: TRelation;
  relation: { table: string; column: string };
  of: string | { [key: string]: string };
  remove?: string | { [key: string]: string };
  add?: string | { [key: string]: string };
  set?: string | null | { [key: string]: string };
  assignToVar?: string;
  awaitResult?: boolean;
}

export interface IParallelAction {
  type: 'parallel';
  actions: TServerAction[];
  assignToVar?: string;
  awaitResult?: boolean;
}

export type TServerAction =
  | ITableRecordCreateAction
  | IReturnAction
  | ITableDataSelectAction
  | IVariableUpdateAction
  | ITableRelationAction
  | IVariableDefineAction
  | ITableRecordUpdateAction
  | ITableRecordDeleteAction
  | IParallelAction
  | IConditionAction;

export interface IHandler {
  name: string;
  actions: TServerAction[];
}
