import { IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({ data, config, pagination, multiple }) => {
  const stringifiedConfig = config ? JSON.stringify(config, null, 2) : 'null';
  const stringifiedData = data ? data.replaceAll('$', '') : 'null';
  const { isPaginated = false, itemsPerPage = 10 } = pagination ?? {};  //dont change indents if dont want eslint conflict on server side

  if(!multiple) {
    return  `  return {\n  config: ${stringifiedConfig},\n  data: ${stringifiedData}}`;
  }
  return `  return {
    config: ${stringifiedConfig},
    data: {
      items: ${stringifiedData},
      totalCount,
      paginated: ${isPaginated},
      ${ isPaginated ? `itemsPerPage: ${itemsPerPage},`: ''}
    }
  }`;
};

export default returnActionHandler;
