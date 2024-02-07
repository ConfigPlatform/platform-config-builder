import { IRedirectPageAction, IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config,
  varId
}) => { 
  let redirectPage = config?.find((el) => el.clientHandler === 'redirectPage') as IRedirectPageAction
  let redirectPageConfig;
  if (varId && redirectPage) {
    let stringiedPath = { ...redirectPage };
    stringiedPath.path += `/$${varId}`;
    redirectPageConfig = [...config.filter((el) => el !== redirectPage), stringiedPath];
  } else {
    redirectPageConfig = config;
  }
  const stringifiedConfig = redirectPageConfig ? JSON.stringify(redirectPageConfig, null, 2) : null;

  let stringifiedData;

  if (!data) {
    stringifiedData = 'null';
  }

  if (data && typeof data === 'string') {
    stringifiedData = data;
  }

  if (data && typeof data !== 'string') {
    const { items, pagination, totalCount } = data;

    const stringifiedPagination = JSON.stringify(pagination, null, 2);

    stringifiedData = `{ items: ${items}, totalCount: ${totalCount}, pagination: ${stringifiedPagination} }`;
  }

  const entries = `  return {\n  config: ${stringifiedConfig},\n  data: ${stringifiedData.replaceAll(
    '$',
    '',
  )}}`;

  return entries;
};

export default returnActionHandler;
