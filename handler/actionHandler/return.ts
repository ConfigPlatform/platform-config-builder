import { IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({ data, config, pagination }) => {
  const stringifiedConfig = config ? JSON.stringify(config, null, 2) : 'null';
  const stringifiedData = data ? data.replaceAll('$', '') : 'null';

  //dont change indents if dont want eslint conflict on server side

  return `  return {
    config: ${stringifiedConfig},
    data: {
      items: ${stringifiedData},
      totalCount,
      ${ !pagination?.[0] ? `itemsPerPage: ${pagination?.[1]},`: ''}
    }
  }`;
};

export default returnActionHandler;
