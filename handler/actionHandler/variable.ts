import { IVariableAction } from '_config/types/handler.types';
import { TCreateActionHandler } from './index';

const variableActionHandler: TCreateActionHandler<IVariableAction> = ({
  name,
  value,
  as
}) => {

  const processedValue = value.replaceAll('$', '');
  const variableDeclaration = `  ${as} ${name} = ${processedValue}`;

  return variableDeclaration;
}

export default variableActionHandler
