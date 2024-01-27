import { IHandler, TServerAction } from '_config/config.handler';
import { mergePaths } from '../helpers';
import { HANDLERS_PATH } from '../paths';
import actionHandler, { TCreateActionHandler } from './actionHandler/index';
const fs = require('fs-extra');
import * as prettier from 'prettier';
const prettierConfig = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

export interface IDeleteHandlerPayload {
  handlerName: string;
  handlersPath: string;
}

// function updates handler file
export const updateHandler = async (handler: IHandler): Promise<void> => {
  const { actions, name: handlerName } = handler;

  let actionsStr = '';

  // loop through actions to fill actionsStr
  for (const action of actions) {
    const { type } = action;

    // define action handler
    const handler = actionHandler[type] as TCreateActionHandler<TServerAction>;

    // continue if handler wasn't found
    if (!handler) continue;

    // execute action handler with data to receive content for performing action
    const actionContent = await handler(action);

    // add action to other actions
    actionsStr += `\n\n${actionContent}`;
  }

  // file entries
  const entries = `const ${handlerName} = async ({ data, entities, dataSource }) => {${actionsStr}\n}\n\nmodule.exports = ${handlerName}`;

  const formattedEntries = prettier.format(entries, {
    ...prettierConfig,
    parser: 'typescript',
  });

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
