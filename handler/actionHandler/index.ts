import {
  IAddRelationAction,
  IInsertAction,
  IMutateAction,
  IRemoveRelationAction,
  IReturnAction,
  ISelectAction,
  IVariableAction,
  IDeleteAction,
  TServerAction,
  IUpdateAction
} from '_config/config.handler';
import insertActionHandler from './insert';
import mutateActionHandler from './mutate';
import selectActionHandler from './select';
import returnActionHandler from './return';
import relationActionHandler from './relation';
import variableActionHandler from './variable';
import updateActionHandler from './update';
import deleteActionHandler from './delete';

export interface IActionPayload {
  [key: string]: any;
}

export type TCreateActionHandler<TPayload extends TServerAction> = (
  payload: TPayload,
) => string;

export interface IActionHandler {
  insert: TCreateActionHandler<IInsertAction>;
  mutate: TCreateActionHandler<IMutateAction>;
  select: TCreateActionHandler<ISelectAction>;
  addRelation: TCreateActionHandler<IAddRelationAction>;
  removeRelation: TCreateActionHandler<IRemoveRelationAction>;
  return: TCreateActionHandler<IReturnAction>;
  variable: TCreateActionHandler<IVariableAction>;
  update: TCreateActionHandler<IUpdateAction>;
  delete: TCreateActionHandler<IDeleteAction>;
}

// action handler by action name
const actionHandler: IActionHandler = {
  insert: insertActionHandler,
  mutate: mutateActionHandler,
  select: selectActionHandler,
  addRelation: relationActionHandler,
  removeRelation: relationActionHandler,
  return: returnActionHandler,
  variable: variableActionHandler,
  update: updateActionHandler,
  delete: deleteActionHandler
};

export default actionHandler;
