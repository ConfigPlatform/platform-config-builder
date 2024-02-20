import actionHandler, { TCreateActionHandler } from './index';
import { IParallelAction, TServerAction } from '../../_config/types/handler.types';

const parallelActionHandler: TCreateActionHandler<IParallelAction> = ({
  actions,
  assignToVar,
}) => {
  const promises = actions.map((action) => {
    const handler = actionHandler[
      action.type
    ] as TCreateActionHandler<TServerAction>;
    const formatCode = `${handler(action)},`;
    return formatCode.replace(/\n/g, '\n      ');
  });

  let entries = '';

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  entries += `await Promise.all([
    ${promises.join('\n      ')}
  ]);
`;

  return entries;
};

export default parallelActionHandler;
