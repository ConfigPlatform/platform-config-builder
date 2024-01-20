import { IDeleteAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const deleteActionHandler: TCreateActionHandler<IDeleteAction> = ({
  entityName,
  where,
}) => {
  
  const entityClassName = createClassName(entityName);

  const entries = `await dataSource
    .createQueryBuilder()
    .delete()
    .from(entities.${entityClassName}) 
    .where(${JSON.stringify(where, null, 2).replaceAll('$', '')})
    .execute()`;

  return entries;
};

export default deleteActionHandler;
