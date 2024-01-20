import actionHandler, { TCreateActionHandler } from './index';
import { IParallelAction, TServerAction } from '../../_config/config.handler';

const parallelActionHandler: TCreateActionHandler<IParallelAction> = ({
  actions,
  assignVar
}) => {
  const promises = actions.map((action) => {
    const handler = actionHandler[
      action.type
    ] as TCreateActionHandler<TServerAction>;
    return handler(action);
  });

  const parallelCode = `
    ${assignVar ? `const ${assignVar} = ` : ''}await Promise.all([
      ${promises.join(',')}
    ]);
  `;

  return parallelCode;
};

export default parallelActionHandler;
