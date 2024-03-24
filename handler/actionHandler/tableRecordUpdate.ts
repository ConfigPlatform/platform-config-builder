import { ITableRecordUpdateAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { whereOperationHandler } from './tableDataSelect';
import { createClassName, createValueFromTemplate } from '../../helpers';

type TIgnoredKey = 'type' | 'assignToVar' | 'awaitResult';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

const updateOperationHandler = ({ payload }: IOperationPayload<string>) => {
  const className = createClassName(payload);

  const entries = `.update(entities.${className})`;
  return entries;
};

const setOperationHandler = ({
  payload,
}: IOperationPayload<{ [field: string]: string } | string>) => {
  // Payload types:
  // values
  // { firstName: "{{ data.firstName }}" }
  // { firstName: "Max" }

  let data = '';

  // converting payload in needed format
  if (typeof payload === 'string') {
    data = createValueFromTemplate(payload);
  } else {
    data += '{';

    // loop through data to construct valid object for queryBuilder
    for (const key in payload) {
      let value = payload[key];

      if (typeof value === 'string') {
        value = createValueFromTemplate(value);
      }

      data += `${key}: ${value}`;

      // don't add comma after last entry
      if (Object.keys(data).indexOf(key) < Object.keys(data).length - 1) {
        data += ',';
      }
    }

    data += '}';
  }

  const entries = `.set(${data})`;

  return entries;
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
