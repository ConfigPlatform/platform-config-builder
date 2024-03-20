import {
  ITableRelationAction,
  ITableRecordCreateAction,
  IVariableUpdateAction,
  IReturnAction,
  ITableDataSelectAction,
  IVariableDefineAction,
  ITableRecordDeleteAction,
  TServerAction,
  ITableRecordUpdateAction,
  IParallelAction,
  IConditionAction,
} from '_config/types/config.handler';
import tableRecordCreateActionHandler from './tableRecordCreate';
import variableUpdateActionHandler from './variableUpdate';
import tableDataSelectActionHandler from './tableDataSelect';
import returnActionHandler from './return';
import tableRelationActionHandler from './tableRelation';
import variableDefineActionHandler from './variableDefine';
import tableRecordUpdateActionHandler from './tableRecordUpdate';
import tableRecordDeleteActionHandler from './tableRecordDelete';
import parallelActionHandler from './parallel';
import conditionActionHandler from './condition';

export type TCreateActionHandler<TPayload extends TServerAction> = (
  payload: TPayload,
) => string;

export interface IActionHandler {
  TABLE_RECORD_CREATE: TCreateActionHandler<ITableRecordCreateAction>;
  TABLE_RECORD_UPDATE: TCreateActionHandler<ITableRecordUpdateAction>;
  TABLE_RECORD_DELETE: TCreateActionHandler<ITableRecordDeleteAction>;
  TABLE_RELATION: TCreateActionHandler<ITableRelationAction>;
  TABLE_DATA_SELECT: TCreateActionHandler<ITableDataSelectAction>;
  VARIABLE_DEFINE: TCreateActionHandler<IVariableDefineAction>;
  VARIABLE_UPDATE: TCreateActionHandler<IVariableUpdateAction>;
  RETURN: TCreateActionHandler<IReturnAction>;
  PARALLEL: TCreateActionHandler<IParallelAction>;
  CONDITION: TCreateActionHandler<IConditionAction>;
}

// action handler by action name
const actionHandler: IActionHandler = {
  TABLE_RECORD_CREATE: tableRecordCreateActionHandler,
  TABLE_DATA_SELECT: tableDataSelectActionHandler,
  TABLE_RELATION: tableRelationActionHandler,
  TABLE_RECORD_UPDATE: tableRecordUpdateActionHandler,
  TABLE_RECORD_DELETE: tableRecordDeleteActionHandler,
  VARIABLE_UPDATE: variableUpdateActionHandler,
  VARIABLE_DEFINE: variableDefineActionHandler,
  RETURN: returnActionHandler,
  PARALLEL: parallelActionHandler,
  CONDITION: conditionActionHandler,
};

export default actionHandler;
