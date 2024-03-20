import { IVariableDefineAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';

const variableDefineActionHandler: TCreateActionHandler<
  IVariableDefineAction
> = ({ name, value, as }) => {
  const processedValue = value.replaceAll('$', '');
  const variableDeclaration = `  ${as} ${name} = ${processedValue}`;

  return variableDeclaration;
};

export default variableDefineActionHandler;
