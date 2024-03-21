import { IVariableDefineAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';

const variableDefineActionHandler: TCreateActionHandler<
  IVariableDefineAction
> = ({ name, value }) => {
  const processedValue = value.replaceAll('$', '');
  const variableDeclaration = `let ${name} = ${processedValue}`;

  return variableDeclaration;
};

export default variableDefineActionHandler;
