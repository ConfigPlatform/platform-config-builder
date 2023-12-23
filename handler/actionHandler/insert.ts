import { IInsertAction } from '_config/config.handler';
import { createClassName } from '../../helpers';

const insertActionHandler = ({
  entityName,
  assignVar,
  fields,
}: IInsertAction): string => {
  const entityClassName = createClassName(entityName);

  const values = fields
    .map((el) => `${el.entityField}: ${el.value.replaceAll('$', '')}`)
    .join(', ');

  const entries = `  ${
    assignVar ? `const ${assignVar} = ` : ''
  }await dataSource\n    .createQueryBuilder()\n    .insert()\n    .into(entities.${entityClassName})\n    .values({ ${values} })\n    .execute()`;

  return entries;
};

export default insertActionHandler;
