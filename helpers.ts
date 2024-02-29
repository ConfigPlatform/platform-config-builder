import * as path from 'path';

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
  `${str[0].toUpperCase()}${str.slice(1)}`;

// functions merges two or more paths
export const mergePaths = (...paths: string[]): string => path.join(...paths);

// function defines value format
export const defineValueFormat = (value: string | number): string | number => {
  if (typeof value === 'number') return value;

  if (value.includes('$')) return value.replaceAll('$', '');

  return `'${value}'`;
};

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
