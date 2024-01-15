import { IUpdateAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const updateActionHandler: TCreateActionHandler<IUpdateAction> = ({
  entityName,
  fields,
  where,
}) => {
  const entityClassName = createClassName(entityName);

  const updateValues = fields
    .map((field) => `${field.entityField}: ${field.value.replaceAll('$', '')}`)
    .join(', ');

  const updateQuery = `await dataSource
    .createQueryBuilder()
    .update(entities.${entityClassName})
    .set({ ${updateValues} })
    .where(${JSON.stringify(where, null, 2).replaceAll('$', '')})
    .execute()`;

  return updateQuery;
};

export default updateActionHandler;
