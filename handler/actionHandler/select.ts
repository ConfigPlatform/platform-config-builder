import { ISelectAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

type TIgnoredKey = 'entityName' | 'type' | 'assignVar' | 'multiple';

interface IOperationPayload<TPayload> {
  entityName: string;
  payload: TPayload;
  operationKey: string;
}

const whereOperationHandler = ({
  entityName,
  payload,
  operationKey,
}: IOperationPayload<{ [key: string]: any }>): string => {
  const field = Object.keys(payload)[0];
  const value = Object.values(payload)[0].replaceAll('$', '');

  const entries = `\n    .${operationKey}('${entityName}.${field} = :${field}', { ${field}: ${value} })`;

  return entries;
};

const leftJoinAndSelectOperationHandler = ({
  entityName,
  payload,
  operationKey,
}: IOperationPayload<[string, string]>): string => {
  const [field, foreignEntityName] = payload;

  const entries = `\n    .${operationKey}('${entityName}.${field}', '${foreignEntityName}')`;

  return entries;
};

const itemsPerPageOperationHandler = ({
  payload,
}: IOperationPayload<number>): string => {
  const entries = `\n    .skip(((data.page || 1) - 1) * ${payload})\n    .take(${payload})`;

  return entries;
};

const orderByOperationHandler = ({
                                   entityName,
                                   payload, // payload is sortingOptions from client
                                   operationKey,
                                 }: IOperationPayload<{[key: string]: 'DESC' | 'ASC'}>): string => {
  let orderByStr = '';

  // Loop over the payload keys and values
  for (const [field, order] of Object.entries(payload)) {
    orderByStr += `\n    .${operationKey}('${entityName}.${field}', '${order}')`;
  }

  return orderByStr;
};

const selectActionHandler: TCreateActionHandler<ISelectAction> = (
  operations,
) => {
  const { entityName, multiple, itemsPerPage, assignToVar, awaitResult } =
    operations;

  const entityClassName = createClassName(operations.entityName);

  let entries = ``;

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n    .createQueryBuilder()\n    .select('${entityName}')\n    .from(entities.${entityClassName}, '${entityName}')`;

  const ignoredKeys: TIgnoredKey[] = [
    'entityName',
    'type',
    'assignVar',
    'multiple',
  ];

  // loop through operations to fill entries
  for (const operationKey in operations) {
    // continue, if it's ignored key
    if (ignoredKeys.includes(operationKey as TIgnoredKey)) continue;

    const operationPayload = operations[operationKey];

    // payload for operation handler
    const operationHandlerPayload: IOperationPayload<typeof operationPayload> =
      {
        entityName,
        payload: operationPayload,
        operationKey,
      };

    let operationsStr = '';

    // define operation
    switch (operationKey as keyof Omit<ISelectAction, TIgnoredKey>) {
      case 'where':
      case 'orWhere':
        operationsStr += whereOperationHandler(operationHandlerPayload);
        break;
      case 'orderBy':
        entries += orderByOperationHandler(operationHandlerPayload);
        break;
      case 'itemsPerPage':
        operationsStr += itemsPerPageOperationHandler(operationHandlerPayload);
        break;

      case 'leftJoinAndSelect':
        // payload can be [string, string] or [string, string][]
        // define format to handler data
        if (
          typeof operationPayload[0] === 'string' &&
          typeof operationPayload[1] === 'string'
        ) {
          // execute handler
          operationsStr += leftJoinAndSelectOperationHandler(
            operationHandlerPayload,
          );
        } else {
          // loop through handler payloads to execute handler
          for (const payload of operationPayload) {
            const operationHandlerPayload: IOperationPayload<typeof payload> = {
              entityName,
              payload,
              operationKey,
            };

            // execute handler
            operationsStr += leftJoinAndSelectOperationHandler(
              operationHandlerPayload,
            );
          }
        }

        break;
    }

    entries += operationsStr;
  }

  // return data operation
  const getDataOperation = `\n    .get${
    itemsPerPage ? 'ManyAndCount' : multiple ? 'Many' : 'One'
  }()`;

  entries += getDataOperation;

  return entries;
};

export default selectActionHandler;
