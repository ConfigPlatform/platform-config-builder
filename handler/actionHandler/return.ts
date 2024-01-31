import { IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config,
}) => {

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

  const modifiedConfig = config ? config.map((action) => {
    if(action.clientHandler === 'redirect_page'){
      const productId = {productId: '123'};
      return {
        ...action,
        path: action.path.replace(/\$productId/g, productId.productId)
      }
    }
    return action;
  }) : null

  const stringifiedConfig = config ? JSON.stringify(modifiedConfig, null, 2) : 'null';

  const entries = `  return {\n  config: ${stringifiedConfig},\n  data: ${stringifiedData.replaceAll(
    '$',
    '',
  )}}`;

  return entries;
};

export default returnActionHandler;
