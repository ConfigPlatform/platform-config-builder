import { IConditionAction, TServerAction } from '_config/types/config.handler';
import actionHandler, { TCreateActionHandler } from './index';

const formatCode = (action: TServerAction) => {
  const handler = actionHandler[action.type] as TCreateActionHandler<TServerAction>;
  return `${handler(action).replace(/\n/g, '\n      ')}`;
};

const conditionActionHandler: TCreateActionHandler<IConditionAction> = ({
  condition,
  onMatch,
  onNotMatch,
}) => {
  condition = condition.replaceAll('$', '');

  const formattedOnMatch = onMatch.map(formatCode);
  const formattedOnNotMatch = onNotMatch.map(formatCode);

  const entriesFormattedOnMatch = formattedOnMatch.join('\n      ');
  const entriesFormattedOnNotMatch = formattedOnNotMatch.join('\n      ');

  return `if (${condition}) { ${entriesFormattedOnMatch} } else { ${entriesFormattedOnNotMatch} }`;
};

export default conditionActionHandler;
