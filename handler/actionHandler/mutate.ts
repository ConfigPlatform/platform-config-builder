import { IMutateAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const mutateActionHandler: TCreateActionHandler<IMutateAction> = ({
  steps,
}) => {
  let entries = '';

  // loop through data to create mutations
  for (const step of steps) {
    const { field, value } = step;
    const mutationStr = `\n  ${field.replaceAll('$', '')} = ${value.replaceAll(
      '$',
      '',
    )}`;

    entries += mutationStr;
  }

  return entries;
};

export default mutateActionHandler;
