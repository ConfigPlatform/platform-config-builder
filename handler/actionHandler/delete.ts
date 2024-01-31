import { IDeleteAction } from '_config/config.handler';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const deleteActionHandler: TCreateActionHandler<IDeleteAction> = ({
  entityName,
  where,
  awaitResult,
}) => {
  const entityClassName = createClassName(entityName);

  const whereOperationHandler = (payload) => {
    // console.log(payload)
    const key = Object.keys(payload)[0];
    const value = (Object.values(payload)[0] as string).replaceAll('$', '');
    const result = `{ ${key}: ${value} }`;
    return result;
  };

  //.where(${JSON.stringify(where, null, 2).replaceAll('$', '')})

  let entries = ``;

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource
  .createQueryBuilder()
  .delete()
  .from(entities.${entityClassName}) 
  .where(${whereOperationHandler(where)})
  .execute()`;

  return entries;
};

export default deleteActionHandler;
