import { IVariableDefineAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { createValueFromTemplate } from '../../helpers';

const variableDefineActionHandler: TCreateActionHandler<
  IVariableDefineAction
> = ({ name, value }) => {
  const variableDeclaration = `let ${name} = ${createValueFromTemplate(value)}`;

  return variableDeclaration;
};

export default variableDefineActionHandler;
