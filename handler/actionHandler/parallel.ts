import { TCreateActionHandler } from './index';
import { IParallelAction } from '../../_config/config.handler';
import selectActionHandler from './select';


const parallelActionHandler: TCreateActionHandler<IParallelAction> = async ({
  actions,
  }) => {
  const promises = actions.map(action => {
    switch (action.type) {
      case 'select':
        return selectActionHandler(action);
      // Handle other action types similarly
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  });

  const results = await Promise.all(promises);

  // Process results
  const assignments = results.map((result, index) => {
    const action = actions[index];
    if (action.assignVar) {
      return `let ${action.assignVar} = ${JSON.stringify(result)};`;
    }
    return '';
  });

  return assignments.join('\n');
};

export default parallelActionHandler;