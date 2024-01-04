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
                               }: IOperationPayload<[string, string]>): string => {
  const field = payload[0];
  const value = payload[1].replaceAll('$', '');

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


const paginationOperationHandler = ({
                                      entityName,
                                      payload,
                                      operationKey,
                                    }: IOperationPayload<[boolean, number]>): string => {
  const [paginated, itemsPerPage] = payload;
  if(!paginated) return ''

  return  `\n    .skip(((data.page || 1) - 1) * ${itemsPerPage})\n    .take(${itemsPerPage})`;
};

const selectActionHandler: TCreateActionHandler<ISelectAction> = (
  operations,
) => {
  //console.log('operations log', operations);
  const { entityName, multiple, assignVar } = operations;

  const entityClassName = createClassName(operations.entityName);

  let entries = `  const ${assignVar} = await dataSource\n    .createQueryBuilder()\n    .select('${entityName}')\n    .from(entities.${entityClassName}, '${entityName}')`;

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
      case 'andWhere':
      case 'orWhere':
        operationsStr += whereOperationHandler(operationHandlerPayload);
        break;

      case 'pagination':
        operationsStr += paginationOperationHandler(operationHandlerPayload);
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
  const getDataOperation = `\n    .get${!!multiple ? 'Many' : 'One'}();`;

  entries += getDataOperation;

  return entries;
};

export default selectActionHandler;
