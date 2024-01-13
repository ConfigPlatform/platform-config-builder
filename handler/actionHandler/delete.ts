import {IDeleteAction} from '_config/config.handler'
import { createClassName } from 'helpers';
import { TCreateActionHandler } from './index';

const deleteActionHandler: TCreateActionHandler<IDeleteAction> = ({
  entityName,
  where,
}) => {
  const entityClassName = createClassName(entityName);

  const entries = `await myDataSource
    .createQueryBuilder()
    .delete()
    .from(entities.${entityClassName}) 
    .where("${where[0]} = :${where[0]}", { ${[where[0]]}: ${where[1]} })
    .execute()`;

  return entries;
};

export default deleteActionHandler;
