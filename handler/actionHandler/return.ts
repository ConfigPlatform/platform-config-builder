import { IRedirectPageAction, IReturnAction } from '_config/config.handler';
import { TCreateActionHandler } from './index';


const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config
}) => {
   // const stringifiedConfig = config ? JSON.stringify(config, null, 2) : 'null';
   let stringifiedConfig;

   if (!config) {
     stringifiedConfig = 'null';
   } else if (config.length >= 2 && config[1].clientHandler === 'redirect_page' && config[1].path) {
     const redirectAction = { ...config[1] } as IRedirectPageAction;
     if (data) {
       redirectAction.path = redirectAction.path.replace(/\$\w+/g, match => {
         const variableName = match.substring(1);
         return data[variableName] ? `\$${variableName}` : '';
       });
     }
     stringifiedConfig = JSON.stringify([config[0], redirectAction], null, 2);
     console.log('Redirect Action:', redirectAction);
   } else {
     stringifiedConfig = JSON.stringify(config, null, 2);
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
