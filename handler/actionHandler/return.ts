import { IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config,
  pagination,
  multiple,
}) => {
  const stringifiedConfig = config ? JSON.stringify(config, null, 2) : 'null';

  if (data) {
    if (typeof data === 'string') {
      data = data.replaceAll('$', '');
    }

    if (typeof data !== 'string') {
      data.items = data.items.replaceAll('$', '');
    }
  } else {
    data = 'null';
  }

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
