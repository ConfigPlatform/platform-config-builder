import { IInsertAction } from '_config/types/config.handler';
import { createClassName, defineValueFormat } from '../../helpers';
import { TCreateActionHandler } from './index';

const insertActionHandler: TCreateActionHandler<IInsertAction> = ({
  table,
  data,
  assignToVar,
  awaitResult,
}) => {
  const entityClassName = createClassName(table);

  let entries = '';
  let values = '';

  // in case of variable, for example { data: "$data" }
  if (typeof data === 'string') {
    values = data.slice(1);
  } else {
    // in case of object, for example
    // { data: { name: "$name" } }
    // or
    // { data: { status: "denied" } }
    // or
    // { data: { amount: 1000 } }

    values += '{';

    for (const key in data) {
      const value = data[key];

      let updatedValue: string | number = '';

      // in case of variable
      // in case of plain string
      if (typeof value === 'string' && (value as string).includes('$')) {
        updatedValue = (value as string).replaceAll('$', '');
      }

      // in case of plain string
      if (typeof value === 'string' && !(value as string).includes('$')) {
        updatedValue += `'${value}'`;
      }

      // in case of number
      if (typeof value === 'number') {
        updatedValue = value;
      }

      values += `${key}: ${updatedValue}`;

      // add comma if not last element
      if (+key !== data.length) {
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

export default insertActionHandler;
