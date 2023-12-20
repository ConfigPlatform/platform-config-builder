import { IHandler } from '_config/config.handler';
import { createClassName, mergePaths } from './helpers';
import { HANDLERS_PATH } from './paths';
const fs = require('fs-extra');

export interface IActionPayload {
  [key: string]: any;
}

export type TActionHandler = (payload: IActionPayload) => string;

export interface IDeleteHandlerPayload {
  handlerName: string;
  handlersPath: string;
}

// function creates mutation action
const createMutationAction = ({ data, dataVar }: IActionPayload): string => {
  let entries = '';

  // loop through data to create mutations
  for (const mutation of data) {
    const mutationStr = `\n  ${dataVar}.${
      mutation.fieldName
    } = ${mutation.update.replaceAll('$', `${dataVar}.`)}`;

    entries += mutationStr;
  }

  return entries;
};

// function creates save action
const createSaveAction = ({ entityName }: IActionPayload): string => {
  const entityClassName = createClassName(entityName);

  const entries = `  await dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values(data)\n    .execute()`;

  return entries;
};

// function creates return action
const createReturnAction = ({ data, config }: IActionPayload): string => {
  const stringifiedConfig = JSON.stringify(config, null, 2);
  const stringifiedData = data ? data.replaceAll('$', '') : 'null';

  const entries = `  return {\n  config: ${stringifiedConfig},\n  data: ${stringifiedData}}`;

  return entries;
};

// function creates select action
const createSelectAction = ({
  joins,
  multiple,
  assignVar,
  entityName,
}): string => {
  const entityClassName = createClassName(entityName);

  let joinsStr = '';

  if (joins) {
    // loop through joins schema to create joins
    for (const join of joins) {
      const [own, foreign] = join;
      joinsStr += `\n    .leftJoinAndSelect('${own}', '${foreign}')`;
    }
  }

  // return data operation
  const getDataOperation = `.get${!!multiple ? 'Many' : 'One'}()`;

  const entries = `  const ${assignVar} = await dataSource\n    .createQueryBuilder()\n    .select('${entityName}')\n    .from(entities.${entityClassName}, '${entityName}')${joinsStr}\n    ${getDataOperation}`;

  return entries;
};

// action handler by action name
const actionHandler: { [key: string]: TActionHandler } = {
  create: createSaveAction,
  mutation: createMutationAction,
  select: createSelectAction,
  return: createReturnAction,
};

// function updates handler file
export const updateHandler = (handler: IHandler): void => {
  const { entityName, actions, name: handlerName } = handler;

  let actionsStr = '';

  // loop through actions to fill actionsStr
  for (const action of actions) {
    const { type } = action;

    // define action handler
    const handler = actionHandler[type];

    // continue if handler wasn't found
    if (!handler) continue;

    // execute action handler with data to receive content for performing action
    const actionContent = actionHandler[type]({ entityName, ...action });

    // add action to other actions
    actionsStr += `\n\n${actionContent}`;
  }

  // file entries
  const entries = `const ${handlerName} = async ({ data, entities, dataSource }) => {${actionsStr}\n}\n\nmodule.exports = ${handlerName}`;

  // entity file path
  const handlerFilePath = mergePaths(HANDLERS_PATH, `${handlerName}.ts`);

  // update handler file
  fs.writeFileSync(handlerFilePath, entries);
};

// function deletes handler
export const deleteHandler = ({
  handlerName,
  handlersPath,
}: IDeleteHandlerPayload): void => {
  // define handler file path
  const handlerFilePath: string = mergePaths(handlersPath, `${handlerName}.ts`);

  // delete file
  fs.removeSync(handlerFilePath);
};
