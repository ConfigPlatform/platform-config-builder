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

export const replaceVarsInString = (str: string): string => {
  // Replace the template syntax {{...}} with the JavaScript template literal syntax ${...}
  const outputString = str.replace(/{{(.*?)}}/g, '${$1}');
  return outputString;
};

export const checkIfStringIncludeVars = (str: string) => {
  // Define the template pattern for variables
  const variablePattern = /\{\{[^\}]+\}\}/;

  // Check if the string includes any template variables
  return variablePattern.test(str);
};
