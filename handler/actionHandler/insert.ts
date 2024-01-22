import { IInsertAction } from '_config/config.handler';
import { createClassName, defineValueFormat } from '../../helpers';
import { TCreateActionHandler } from './index';

const insertActionHandler: TCreateActionHandler<IInsertAction> = ({
  entityName,
  assignToVar,
  fields,
  awaitResult,
}) => {
  const entityClassName = createClassName(entityName);

  const values = fields
    .map((el) => `${el.entityField}: ${defineValueFormat(el.value)}`)
    .join(', ');

  let entries = ``;

  // check if we should assign result to var
  if (assignToVar) {
    entries += `${assignToVar} = `;
  }

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values({ ${values} })\n    .execute()`;

  return entries;
};

export default insertActionHandler;
