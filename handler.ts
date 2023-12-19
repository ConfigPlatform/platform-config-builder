import { IField, IHandler } from '_config/config.handler';
import { createClassName, mergePaths } from './helpers';
import { HANDLERS_PATH } from './paths';
const fs = require('fs-extra');

export interface IActionHandlerPayload {
  data: any;
  entityName: string;
}

export type TActionHandler = (payload: IActionHandlerPayload) => string;

export interface IDeleteHandlerPayload {
  handlerName: string;
  handlersPath: string;
}

// function creates save action
const createSaveAction = ({
  data,
  entityName,
}: IActionHandlerPayload): string => {
  const entityClassName = createClassName(entityName);

  // convert arr of field object to array of strings which represent fields data
  const entityValuesArr = data.map((el: IField) => {
    const value = el.update
      ? el.update.replaceAll('$', 'data.')
      : `data.${el.fieldName}`;

    return `${el.entityFieldName}: ${value}`;
  });

  // convert entityValuesArr to string with separated fields
  const entityValuesStr = entityValuesArr.join(', ');

  const entries = `  await dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values({ ${entityValuesStr} })\n    .execute()`;

  return entries
};

// function creates return config action
const createReturnConfigAction = ({ data }: IActionHandlerPayload): string => {
  const config = JSON.stringify(data, null, 2);

  // file entries
  const entries = `  return ${config}`;

  return entries;
};

// action handler by action name
const actionHandler: { [key: string]: TActionHandler } = {
  create: createSaveAction,
  returnConfig: createReturnConfigAction,
};

// function updates handler file
export const updateHandler = (handler: IHandler): void => {
  const { entityName, actions, name: handlerName } = handler;

  let actionsStr = '';

  // loop through actions to fill actionsStr
  for (const action of actions) {
    const { type, data } = action;

    // execute action handler with data to receive content for performing action
    const actionContent = actionHandler[type]({ data, entityName });

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
