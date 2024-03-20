import { ITableRelationAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { createClassName } from '../../helpers';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

type TIgnoredKey = 'type' | 'awaitResult';

const relationOperationHandler = ({
  payload,
}: IOperationPayload<{ table: string; column: string }>) => {
  const entityClassName = createClassName(payload.table);

  const entries = `.relation(entities.${entityClassName}, '${payload.column}')`;

  return entries;
};

const ofOperationHandler = ({
  payload,
}: IOperationPayload<string | { [key: string]: string }>) => {
  const value = typeof payload === 'string' ? `'${payload}'` : payload;

  const entries = `.of(${value})`;

  return entries;
};

const removeOperationHandler = ({
  payload,
}: IOperationPayload<string | { [key: string]: string }>) => {
  const value = typeof payload === 'string' ? `'${payload}'` : payload;

  const entries = `.remove(${value})`;

  return entries;
};

const addOperationHandler = ({
  payload,
}: IOperationPayload<string | { [key: string]: string }>) => {
  const value = typeof payload === 'string' ? `'${payload}'` : payload;

  const entries = `.add(${value})`;

  return entries;
};

const setOperationHandler = ({
  payload,
}: IOperationPayload<string | { [key: string]: string }>) => {
  const value = typeof payload === 'string' ? `'${payload}'` : payload;

  const entries = `.set(${value})`;

  return entries;
};

// operation handler map
const operationHandlerMap: {
  [operation in keyof Omit<ITableRelationAction, TIgnoredKey>]: (
    payload: IOperationPayload<any>,
  ) => string;
} = {
  relation: relationOperationHandler,
  of: ofOperationHandler,
  remove: removeOperationHandler,
  add: addOperationHandler,
  set: setOperationHandler,
};

const tableRelationActionHandler: TCreateActionHandler<ITableRelationAction> = (
  operations,
) => {
  const { awaitResult } = operations;

  let entries = ``;

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += 'dataSource\n    .createQueryBuilder()';

  const ignoredKeys: TIgnoredKey[] = ['type', 'awaitResult'];

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

  return entries;
};

export default tableRelationActionHandler;
