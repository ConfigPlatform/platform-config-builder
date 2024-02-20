import {
  IAddRelationAction,
  IRemoveRelationAction,
} from '_config/types/handler.types';
import { createClassName } from '../../helpers';
import { TCreateActionHandler } from './index';

const relationActionHandler: TCreateActionHandler<
  IAddRelationAction | IRemoveRelationAction
> = (payload) => {
  const { type, entityName, field, awaitResult } = payload;

  const entityClassName = createClassName(entityName);
  const entityId = payload.entityId.replaceAll('$', '');

  let entries = ``;

  // check if we should await result
  if (awaitResult) {
    entries += 'await ';
  }

  entries += `dataSource\n    .createQueryBuilder()\n    .relation(entities.${entityClassName}, '${field}')\n    .of(${entityId})`;

  // define relation fn
  if (type === 'addRelation') {
    const id = payload.addId.replaceAll('$', '');
    entries += `\n    .add(${id})`;
  } else {
    const id = payload.removeId.replaceAll('$', '');
    entries += `\n    .remove(${id})`;
  }

  return entries;
};

export default relationActionHandler;
