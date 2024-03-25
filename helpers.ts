import * as path from 'path';
import { get } from 'lodash';

export interface ICreateModuleImportPayload {
  variable: string;
  path: string;
}

// function dynamically creates module import string
export const createModuleImport = ({
  variable,
  path,
}: ICreateModuleImportPayload): string => `import ${variable} from '${path}'`;

// function creates class name from string
export const createClassName = (str: string) =>
  `${get(str, '[0]', '').toUpperCase()}${str?.slice(1)}`;

// functions merges two or more paths
export const mergePaths = (...paths: string[]): string => path.join(...paths);

export const checkIfStringIsTemplate = (
  str: string,
): { variableCount: number; includesNonVariableContent: boolean } => {
  // Updated the template pattern to match variables and inline JavaScript code
  // This pattern is now more permissive, allowing for matching JavaScript expressions inside the braces
  const variablePattern = /\{\{.+?\}\}/g;

  // Find all template variables in the string, including those with inline JavaScript
  const matches = str.match(variablePattern);
  const variableCount = matches ? matches.length : 0;

  // Remove all template variables from the string
  const stringWithoutVariables = str.replace(variablePattern, '');

  // Check if the remaining string includes any content other than spaces
  const includesNonVariableContent = stringWithoutVariables.trim().length > 0;

  return {
    variableCount,
    includesNonVariableContent,
  };
};

export const createValueFromTemplate = (input: any): string => {
  if (typeof input !== 'string') return JSON.stringify(input);

  const { variableCount, includesNonVariableContent } =
    checkIfStringIsTemplate(input);

  // return plain string if no vars
  if (!variableCount) return `'${input}'`;

  // Replace the template syntax {{...}} with the JavaScript template literal syntax ${...}
  let outputString = input.replace(/{{(.*?)}}/g, '${$1}');

  // only for plain vars
  if (!includesNonVariableContent) {
    const strWithoutSpaces = input.replaceAll(' ', '');

    return strWithoutSpaces.slice(2, strWithoutSpaces.length - 2);
  }

  // apply format to return double string
  outputString = '`' + outputString + '`';

  return outputString;
};
