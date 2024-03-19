export interface IField {
  value: string;
  entityField: string;
  update?: string;
}

export type TRelation = 'addRelation' | 'removeRelation';
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
  table: string;
  data: string | { [field: string]: string | number }[];
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
  leftJoinAndSelect?:
    | { column: string; table: string }
    | { column: string; table: string }[];
  where?: { table: string; filters: { [key: string]: any } | string };
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

export interface IMutateAction {
  type: 'mutate';
  field: string;
  value: string;
}

export interface IRelationAction {
  type: TRelation;
  entityName: string;
  entityId: string;
  field: string;
  awaitResult?: boolean;
}

export interface IAddRelationAction extends IRelationAction {
  type: 'addRelation';
  addId: string;
}

export interface IRemoveRelationAction extends IRelationAction {
  type: 'removeRelation';
  removeId: string;
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
