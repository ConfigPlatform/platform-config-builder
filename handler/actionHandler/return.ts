import { IReturnAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config,
}) => {
  let stringifiedConfig;

  const stringifyConfig = (config) => {
    return JSON.stringify(
      config,
      (key, value) => {
        if (key === 'path') {
          return `\${${value.replace(/\$([\w\d]+)/g, (_, variableName) => {
            return variableName ? `\${${variableName}}` : '';
          })}}`;
        }
        return value;
      },
      2,
    )
      .replace(/"\$\{/g, '`')
      .replace(/\}"/g, '`');
  };

  if (!config) {
    stringifiedConfig = 'null';
  }

  if (config && Array.isArray(config)) {
    stringifiedConfig = stringifyConfig(config);
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
