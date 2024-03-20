import {
  ITableRecordDeleteAction,
  ITableRelationAction,
} from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { fromOperationHandler, whereOperationHandler } from './tableDataSelect';

type TIgnoredKey = 'type' | 'assignToVar' | 'awaitResult';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

const tableRecordDeleteActionHandler: TCreateActionHandler<
  ITableRecordDeleteAction
> = (operations) => {
  const { assignToVar, awaitResult } = operations;

  let entries = ``;

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n.createQueryBuilder()\n.delete()`;

  const ignoredKeys: TIgnoredKey[] = ['type', 'assignToVar', 'awaitResult'];

  // operation handler map
  const operationHandlerMap: {
    [operation in keyof Omit<ITableRecordDeleteAction, TIgnoredKey>]: (
      payload: IOperationPayload<any>,
    ) => string;
  } = {
    from: fromOperationHandler,
    where: whereOperationHandler,
  };

  // loop through operations to fill entries
  for (const operationKey in operations) {
    // continue, if it's ignored key
    if (ignoredKeys.includes(operationKey as TIgnoredKey)) continue;

    const operationPayload = operations[operationKey];

    // payload for operation handler
    const operationHandlerPayload: IOperationPayload<typeof operationPayload> =
      {
        payload: operationPayload,
        operationKey,
      };

    const operationHandler = operationHandlerMap[operationKey];
    entries += operationHandler(operationHandlerPayload);
  }

  entries += '.execute()';

  return entries;
};

export default tableRecordDeleteActionHandler;
