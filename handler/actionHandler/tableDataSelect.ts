import { ITableDataSelectAction } from '_config/types/config.handler';
import {
  checkIfStringIncludeVars,
  createClassName,
  replaceVarsInString,
} from '../../helpers';
import { TCreateActionHandler } from './index';
import { isArray } from 'lodash';

type TIgnoredKey = 'type' | 'assignToVar' | 'awaitResult';

interface IOperationPayload<TPayload> {
  payload: TPayload;
  operationKey: string;
}

const getOneOperationHandler = ({ payload }: IOperationPayload<boolean>) => {
  const entries = `.getOne()`;
  return entries;
};

const getManyAndCountOperationHandler = ({
  payload,
}: IOperationPayload<boolean>) => {
  const entries = `.getManyAndCount()`;
  return entries;
};

const getManyOperationHandler = ({ payload }: IOperationPayload<boolean>) => {
  const entries = `.getMany()`;
  return entries;
};

const getRawManyOperationHandler = ({
  payload,
}: IOperationPayload<boolean>) => {
  const entries = `.getRawMany()`;
  return entries;
};

const groupByOperationHandler = ({ payload }: IOperationPayload<string>) => {
  const entries = `.groupBy('${payload}')`;
  return entries;
};

const leftJoinOperationHandler = ({
  payload,
}: IOperationPayload<{ table: string; condition: string }>) => {
  const entityClassName = createClassName(payload.table);
  const entries = `.leftJoin(entities.${entityClassName}, '${payload.table}', '${payload.condition}')`;

  return entries;
};

export const fromOperationHandler = ({
  payload,
}: IOperationPayload<{ table: string; alias?: string }>) => {
  const entityClassName = createClassName(payload.table);
  const entries = `.from(entities.${entityClassName}, '${
    payload.alias || payload.table
  }')`;

  return entries;
};

const selectOperationHandler = ({
  payload,
}: IOperationPayload<{ column: string; alias: string }[] | string>) => {
  if (typeof payload === 'string') return `.select('${payload}')`;

  const selections = payload.reduce((acc, curr, i) => {
    if (i !== 0) {
      acc += `\n.addSelect('${curr.column}', '${curr.alias}')`;
      return acc;
    }

    acc += `.select('${curr.column}', '${curr.alias}')`;
    return acc;
  }, '');

  return `\n${selections}`;
};

export const whereOperationHandler = ({
  payload,
}: IOperationPayload<{
  condition: string;
  data: { [key: string]: any } | string;
}>): string => {
  // data can be one of 3 structure. Imagine that in first 2 examples we receive data object from client, it's just example, data can be replaced with any object
  // data
  // { firstName: ".*{{ data.filters.name }}.*" }
  // { firstName: "Max" }

  const { condition, data } = payload;

  let inputData = '';

  // converting data in needed format
  if (typeof data === 'string') {
    inputData = data;
  } else {
    inputData += '{';

    // loop through data to construct valid object for queryBuilder
    for (const key in data) {
      let value = data[key];

      const isValueIncludeVars =
        typeof value === 'string' && checkIfStringIncludeVars(value);

      // convert string to accept vars
      if (isValueIncludeVars) {
        value = '`' + replaceVarsInString(value) + '`';
      }

      // value not var and type string => convert to double string
      if (!isValueIncludeVars && typeof value === 'string') {
        value = `'${value}'`;
      }

      // value not var and type number => convert to string
      if (!isValueIncludeVars && typeof value === 'string') {
        value = `${value}`;
      }

      inputData += `${key}: ${value}`;

      // don't add comma after last entry
      if (Object.keys(data).indexOf(key) < Object.keys(data).length - 1) {
        inputData += ',';
      }
    }

    inputData += '}';
  }

  const entries = `\n.where('${condition}', ${inputData})`;

  return entries;
};

const leftJoinAndSelectOperationHandler = ({
  payload,
}: IOperationPayload<
  { column: string; table: string } | { column: string; table: string }[]
>): string => {
  let entries = ``;

  if (!isArray(payload)) {
    payload = [payload];
  }

  for (const index in payload) {
    if (+index === 0) {
      entries += '\n';
    }

    const { column, table } = payload[index];
    entries += `.leftJoinAndSelect('${column}', '${table}')`;
  }

  return entries;
};

const itemsPerPageOperationHandler = ({
  payload,
}: IOperationPayload<number>): string => {
  const entries = `\n    .skip(((data.page || 1) - 1) * ${payload})\n    .take(${payload})`;

  return entries;
};

const orderByOperationHandler = ({
  payload,
  operationKey,
}: IOperationPayload<{ [key: string]: any } | string>): string => {
  // Payload can be one of three formats
  // data.sorting
  // { firstName: "{{ data.sorting.firstName }}" }
  // { firstName: "ASC" }

  let data = '';

  // converting payload in needed format
  if (typeof payload === 'string') {
    data = payload;
  } else {
    data += '{';

    // loop through data to construct valid object for queryBuilder
    for (const key in payload) {
      let value = payload[key];

      const isValueIncludeVars =
        typeof value === 'string' && checkIfStringIncludeVars(value);

      // convert string to accept vars
      if (isValueIncludeVars) {
        value = '`' + replaceVarsInString(value) + '`';
      }

      // value not var and type string => convert to double string
      if (!isValueIncludeVars && typeof value === 'string') {
        value = `'${value}'`;
      }

      // value not var and type number => convert to string
      if (!isValueIncludeVars && typeof value === 'string') {
        value = `${value}`;
      }

      data += `'${key}': ${value}`;

      // don't add comma after last entry
      if (Object.keys(data).indexOf(key) < Object.keys(data).length - 1) {
        data += ',';
      }
    }

    data += '}';
  }

  const entries = `\n    .${operationKey}(${data})`;

  return entries;
};

// operation handler map
const operationHandlerMap: {
  [operation in keyof Omit<ITableDataSelectAction, TIgnoredKey>]: (
    payload: IOperationPayload<any>,
  ) => string;
} = {
  where: whereOperationHandler,
  orderBy: orderByOperationHandler,
  itemsPerPage: itemsPerPageOperationHandler,
  leftJoin: leftJoinOperationHandler,
  leftJoinAndSelect: leftJoinAndSelectOperationHandler,
  from: fromOperationHandler,
  select: selectOperationHandler,
  groupBy: groupByOperationHandler,
  getOne: getOneOperationHandler,
  getMany: getManyOperationHandler,
  getManyAndCount: getManyAndCountOperationHandler,
  getRawMany: getRawManyOperationHandler,
};

const tableDataSelectActionHandler: TCreateActionHandler<
  ITableDataSelectAction
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

  entries += 'dataSource\n    .createQueryBuilder()';

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

  return entries;
};

export default tableDataSelectActionHandler;
