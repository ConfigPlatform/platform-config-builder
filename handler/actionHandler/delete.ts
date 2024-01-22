import { IDeleteAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const deleteActionHandler: TCreateActionHandler<IDeleteAction> = ({
  entityName,
  where,
  awaitResult,
}) => {
  const entityClassName = createClassName(entityName);

  let entries = ``;

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource
  .createQueryBuilder()
  .delete()
  .from(entities.${entityClassName}) 
  .where(${JSON.stringify(where, null, 2).replaceAll('$', '')})
  .execute()`;

  return entries;
};

export default deleteActionHandler;
