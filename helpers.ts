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
