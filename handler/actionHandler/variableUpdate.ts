import { IVariableUpdateAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';

const variableUpdateActionHandler: TCreateActionHandler<
  IVariableUpdateAction
> = ({ variable, value }) => {
  const entries = `${variable} = ${value.replaceAll('$', '')}`;

  return entries;
};

export default variableUpdateActionHandler;
