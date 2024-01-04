import { TCreateActionHandler } from './index';
import { ICountAction } from '../../_config/config.handler';
import { createClassName } from '../../helpers';

const countActionHandler: TCreateActionHandler<ICountAction> = ({ entityName }) =>
  `  const totalCountResponse = await dataSource
    .createQueryBuilder()
    .select('COUNT(${entityName}.id)', 'total')
    .from(entities.${createClassName(entityName)}, '${entityName}')
    .getRawOne();    
    
  const totalCount = parseInt(totalCountResponse.total, 10);`


export default countActionHandler;
