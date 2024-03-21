import { ITableRecordCreateAction } from '_config/types/config.handler';
import { createClassName, createValueFromTemplate } from '../../helpers';
import { TCreateActionHandler } from './index';

const tableRecordCreateActionHandler: TCreateActionHandler<
  ITableRecordCreateAction
> = ({ table, data, assignToVar, awaitResult }) => {
  const entityClassName = createClassName(table);

  let entries = '';
  let values = '';

  // in case of variable, for example { data: "data" }
  if (typeof data === 'string') {
    values = data;
  } else {
    // in case of object, for example
    // { data: { name: "{{ name }}" } }
    // or
    // { data: { status: "denied" } }
    // or
    // { data: { amount: 1000 } }

    values += '{';

    // loop through data to construct valid object for queryBuilder
    for (const key in data) {
      let value = data[key];

      if (typeof value === 'string') {
        value = createValueFromTemplate(value);
      }

      values += `${key}: ${value}`;

      // don't add comma after last entry
      if (Object.keys(data).indexOf(key) < Object.keys(data).length - 1) {
        values += ',';
      }
    }

    values += '}';
  }

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values(${values})\n    .execute()`;

  return entries;
};

export default tableRecordCreateActionHandler;
