import { IConditionAction, TServerAction } from '_config/types/config.handler';
import actionHandler, { TCreateActionHandler } from './index';
import { isEmpty } from 'lodash';

const formatCode = (action: TServerAction) => {
  const handler = actionHandler[
    action.type
  ] as TCreateActionHandler<TServerAction>;
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

  let entries = `if (${condition}) { ${entriesFormattedOnMatch} }`;

  // add else only if exists in config
  if (!isEmpty(onNotMatch)) {
    entries += ` else { ${entriesFormattedOnNotMatch} }`;
  }

  return entries;
};

export default conditionActionHandler;
