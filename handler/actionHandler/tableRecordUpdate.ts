import { ITableRecordUpdateAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { whereOperationHandler } from './tableDataSelect';

type TIgnoredKey = 'type' | 'assignToVar' | 'awaitResult';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

const updateOperationHandler = ({ payload }: IOperationPayload<string>) => {
  const entries = `.update(entities.${payload})`;
  return entries;
};

const setOperationHandler = ({
  payload,
}: IOperationPayload<{ [field: string]: string } | string>) => {
  // Payload types:
  // $values
  // { firstName: '$data.filters.firstName' }
  // { firstName: 'Max' }

  let data = '';

  // converting payload in needed format
  if (typeof payload === 'string') {
    data = payload.slice(1);
  } else {
    data += '{';

    for (const key in payload) {
      const value = payload[key];

      const isValueVar = value.includes('$');
      const updatedValue = isValueVar
        ? value.replaceAll('$', '')
        : `'${value}'`;

      data += `${key}: ${updatedValue}`;

      if (Object.keys(payload).indexOf(key) < Object.keys(payload).length - 1) {
        data += ',';
      }
    }

    data += '}';

    const entries = `.set(${data})`;

    return entries;
  }
};

// operation handler map
const operationHandlerMap: {
  [operation in keyof Omit<ITableRecordUpdateAction, TIgnoredKey>]: (
    payload: IOperationPayload<any>,
  ) => string;
} = {
  update: updateOperationHandler,
  set: setOperationHandler,
  where: whereOperationHandler,
};

const tableRecordUpdateActionHandler: TCreateActionHandler<
  ITableRecordUpdateAction
> = (operations) => {
  const { awaitResult, assignToVar } = operations;

  let entries = ``;

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n.createQueryBuilder()`;

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

  entries += '.execute()';

  return entries;
};

export default tableRecordUpdateActionHandler;
