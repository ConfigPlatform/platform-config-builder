import { ITableRecordUpdateAction } from '_config/types/config.handler';
import { createClassName, defineValueFormat } from '../../helpers';
import { TCreateActionHandler } from './index';

const tableRecordUpdateActionHandler: TCreateActionHandler<
  ITableRecordUpdateAction
> = ({ entityName, fields, where, awaitResult }) => {
  const entityClassName = createClassName(entityName);

  const updateValues = fields
    .map((field) => `${field.entityField}: ${defineValueFormat(field.value)}`)
    .join(', ');

  let entries = ``;

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource
  .createQueryBuilder()
  .update(entities.${entityClassName})
  .set({ ${updateValues} })
  .where(${JSON.stringify(where, null, 2).replaceAll('$', '')})
  .execute()`;

  return entries;
};

export default tableRecordUpdateActionHandler;
