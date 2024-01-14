import { IMutateAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const mutateActionHandler: TCreateActionHandler<IMutateAction> = ({
  field,
  value,
}) => {
  const entries = `  ${field.replaceAll('$', '')} = ${value.replaceAll('$', '')}`;

  return entries;
};

export default mutateActionHandler;
