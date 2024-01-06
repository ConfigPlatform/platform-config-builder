import { IVariableAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const variableActionHandler: TCreateActionHandler<IVariableAction> = ({
  name,
  value,
  as
}) => {

  const processedValue = value.replaceAll('$', '');
  const declaration = as === 'let' ? 'let' : 'const';

  const variableDeclaration = `${declaration} ${name} = ${processedValue}`
  

  return variableDeclaration;
}

export default variableActionHandler
