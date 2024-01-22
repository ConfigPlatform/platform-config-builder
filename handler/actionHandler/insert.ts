import { IInsertAction } from '_config/config.handler';
import { createClassName, defineValueFormat } from '../../helpers';
import { TCreateActionHandler } from './index';

const insertActionHandler: TCreateActionHandler<IInsertAction> = ({
  entityName,
  assignVar,
  fields,
}) => {
  const entityClassName = createClassName(entityName);

  const values = fields
    .map((el) => `${el.entityField}: ${defineValueFormat(el.value)}`)
    .join(', ');

  const entries = `  ${
    assignVar ? `const ${assignVar} = ` : ''
  }await dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values({ ${values} })\n    .execute()`;

  return entries;
};

export default insertActionHandler;
