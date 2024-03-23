import { IReturnAction } from '_config/types/config.handler';
import { TCreateActionHandler } from './index';
import { createValueFromTemplate } from '../../helpers';
import { isEmpty } from 'lodash';

const convertObjectToString = (obj: { [key: string]: any }): string => {
  let objStr = '{';

  const properties = Object.keys(obj);
  properties.forEach((property, index) => {
    let value = obj[property];

    // if value is string we should create value from template
    // if value is object we should recursively loop and create values from templates
    if (typeof value !== 'object') {
      value = createValueFromTemplate(value);
    } else {
      value = convertObjectToString(value);
    }

    // Recursively call createValueFromTemplate for nested objects
    let pair = `${property}: ${value}`;

    // Add comma after pair if it's not the last element
    if (index !== properties.length - 1) {
      pair += ',';
    }

    // Add pair to objStr
    objStr += pair;
  });

  objStr += '}';
  return objStr;
};

const returnActionHandler: TCreateActionHandler<IReturnAction> = ({
  data,
  config,
}) => {
  let configStr;

  // if config isn't exist => empty array
  if (!config) {
    configStr = '[]';
  }

  // if config exist => we should process it
  if (config && !isEmpty(config)) {
    // we should convert config array to string
    configStr = config.reduce((acc, handler, currentIndex) => {
      // Convert handler object to string recursively
      const handlerStr = convertObjectToString(handler);

      acc += handlerStr;

      // Add comma after handler to keep array structure if it's not the last element
      // If it's the last element => close array structure
      if (currentIndex !== config.length - 1) {
        acc += ',';
      } else {
        acc += ']';
      }

      return acc;
    }, '[');
  }

  let dataStr = createValueFromTemplate(data);

  if (data && typeof data !== 'string') {
    const { items, pagination, totalCount } = data;

    const itemsValue = createValueFromTemplate(items);
    const totalCountValue = createValueFromTemplate(totalCount);

    const stringifiedPagination = JSON.stringify(pagination, null, 2);

    dataStr = `{ items: ${itemsValue}, totalCount: ${totalCountValue}, pagination: ${stringifiedPagination} }`;
  }

  const entries = `  return {\n  config: ${configStr},\n  data: ${dataStr}}`;

  return entries;
};

export default returnActionHandler;
