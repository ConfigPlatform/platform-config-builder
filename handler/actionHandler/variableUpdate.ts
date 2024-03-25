import { IVariableUpdateAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { createValueFromTemplate } from '../../helpers';

const variableUpdateActionHandler: TCreateActionHandler<
  IVariableUpdateAction
> = ({ variable, value }) => {
  const entries = `${variable} = ${createValueFromTemplate(value)}`;

  return entries;
};

export default variableUpdateActionHandler;
