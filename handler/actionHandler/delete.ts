import { IDeleteAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const deleteActionHandler: TCreateActionHandler<IDeleteAction> = ({
  entityName,
  where,
}) => {
  const field = where[0];
  const value = where[1].replaceAll('$', '');

  const entityClassName = createClassName(entityName);

  const entries = `await dataSource
    .createQueryBuilder()
    .delete()
    .from(entities.${entityClassName}) 
    .where('${field} = :${field}', { ${field}: ${value} })
    .execute()`;

  return entries;
};

export default deleteActionHandler;
