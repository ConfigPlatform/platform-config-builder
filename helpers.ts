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

// function check if string is regexp or plain string
export const checkIfRegexp = (str: string): boolean => {
  // Regular expression to detect common special characters used in regex patterns
  const regexSpecialChars = /[\\^$.*+?()[\]{}|]/;

  // Test if the string contains any of the special characters
  if (regexSpecialChars.test(str)) {
    return true; // Likely intended to be a regex
  }

  return false;
};

export const checkIfStringIncludeVars = (
  str: string,
): { variableCount: number; includesNonVariableContent: boolean } => {
  // Define the template pattern for variables
  const variablePattern = /\{\{[^\}]+\}\}/g;

  // Find all template variables in the string
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
    checkIfStringIncludeVars(input);

  // return plain string if no vars
  if (!variableCount) return `'${input}'`;

  // Replace the template syntax {{...}} with the JavaScript template literal syntax ${...}
  let outputString = input.replace(/{{(.*?)}}/g, '${$1}');

  if (!includesNonVariableContent) {
    const strWithoutSpaces = input.replaceAll(' ', '');

    return strWithoutSpaces.slice(2, strWithoutSpaces.length - 2);
  }

  // apply format to return double string
  outputString = '`' + outputString + '`';

  return outputString;
};
