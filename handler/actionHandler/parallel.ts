import actionHandler, { TCreateActionHandler } from './index';
import { IParallelAction } from '../../_config/config.handler';

const parallelActionHandler: TCreateActionHandler<IParallelAction> = ({
  actions,
}) => {
  const promises = actions.map(action => {
    const handler = actionHandler[action.type];
    return handler(action)
  })

  const parallelCode = `
    const results = await Promise.all([
      ${promises.join(',')}
    ]);
  `;

  return parallelCode;
};

export default parallelActionHandler;