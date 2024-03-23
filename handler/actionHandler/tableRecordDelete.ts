import { ITableRecordDeleteAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { whereOperationHandler } from './tableDataSelect';
import { createClassName } from '../../helpers';

type TIgnoredKey = 'type' | 'assignToVar' | 'awaitResult';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

const fromOperationHandler = ({
  payload,
}: IOperationPayload<{ table: string; alias?: string }>) => {
  const entityClassName = createClassName(payload.table);
  const entries = `.from(entities.${entityClassName})`;

  return entries;
};

// operation handler map
const operationHandlerMap: {
  [operation in keyof Omit<ITableRecordDeleteAction, TIgnoredKey>]: (
    payload: IOperationPayload<any>,
  ) => string;
} = {
  from: fromOperationHandler,
  where: whereOperationHandler,
};

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
