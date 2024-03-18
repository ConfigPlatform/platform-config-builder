import { ENTITY_CONFIG_PATH } from './paths';
import * as fs from 'fs-extra';
import { ENTITIES_PATH } from './paths';
import { IEntity, IEntity as IEntityData } from './_config/types/config.entity';
import {
  ICreateModuleImportPayload,
  createClassName,
  createModuleImport,
  mergePaths,
} from './helpers';

export interface IDeleteEntityPayload {
  entityName: string;
  entitiesPath: string;
}

// function updates entity file
export const updateEntity = (entityData: IEntityData): void => {
  const { entityName, fields } = entityData;

  // define entity dir path
  const entityDirPath: string = mergePaths(ENTITIES_PATH, `/${entityName}`);

  // create dir if not exists
  if (!fs.pathExistsSync(entityDirPath)) {
    fs.mkdirSync(entityDirPath);
  }

  // entity class name
  const entityClassName = createClassName(entityName);

  // module import payloads
  const moduleImportPayloads: ICreateModuleImportPayload[] = [];

  // typeorm module entries that should be imported
  const typeormRequiredEntries: string[] = [
    'Column',
    'Entity',
    'PrimaryGeneratedColumn',
  ];

  // db table columns
  let columns = `\n  @PrimaryGeneratedColumn()\n  id: number;`;

  // loop through fields to generate columns
  for (const field of fields) {
    const { name, type, options } = field;

    // table relation
    if (type === 'relation') {
      const { ref, foreignField, ownerSide, relationType } = options;

      // ref entity class name
      const entityRefClassName = createClassName(ref);

      const entityImportExists = !!moduleImportPayloads.find((el) =>
        el.path.includes(entityRefClassName),
      );

      // if entity import payload isn't exist, we should add it
      if (!entityImportExists) {
        moduleImportPayloads.push({
          variable: `{ ${entityRefClassName} }`,
          path: `src/entities/${ref}/${ref}.entity`,
        });
      }

      // decorator by relation type
      const relationDecorator = relationType
        .split('-')
        .map(createClassName)
        .join('');

      // if typeormRequiredEntries doesn't include relation decorator, we should add it
      if (!typeormRequiredEntries.includes(relationDecorator)) {
        typeormRequiredEntries.push(relationDecorator);
      }

      let relationRow = `\n\n  @${relationDecorator}(() => ${entityRefClassName}`;

      // if foreignField exists, we should add path
      if (foreignField) {
        relationRow += `, (${ref}) => ${ref}.${foreignField}`;
      }

      relationRow += ')';

      let column = relationRow;

      // if it's owning side of relation, we should add join decorator
      if (ownerSide) {
        if (relationType === 'one-to-one') {
          column += '\n  @JoinColumn()';
          typeormRequiredEntries.push('JoinColumn');
        } else {
          column += '\n  @JoinTable()';
          typeormRequiredEntries.push('JoinTable');
        }
      }

      const arrRelationTypes: string[] = ['one-to-many', 'many-to-many'];

      // define if field is arr of relations
      const isRelationArr: boolean = arrRelationTypes.includes(relationType);

      // add field definition
      column += `\n  ${name}: ${entityRefClassName}${
        isRelationArr ? '[]' : ''
      };`;

      columns += column;

      continue;
    }

    const optionArr: [string, string][] = Object.entries(options);
    const optionStr = optionArr.map((el) => `${el[0]}: '${el[1]}'`).join(', ');

    const column = `\n\n  @Column({ ${optionStr}, nullable: true })\n  ${name}: ${type};`;

    columns += column;
  }

  const typeormRequiredEntriesStr = typeormRequiredEntries.join(', ');

  // add entries import from typeorm
  moduleImportPayloads.unshift({
    variable: `{ ${typeormRequiredEntriesStr} }`,
    path: 'typeorm',
  });

  // create module imports
  const moduleImports = moduleImportPayloads.map(createModuleImport).join('\n');

  // file entries
  const entries = `${moduleImports}\n\n@Entity()\nexport class ${entityClassName} {${columns}\n}`;

  // entity file path
  const entityFilePath = mergePaths(entityDirPath, `${entityName}.entity.ts`);

  // update entity file
  fs.writeFileSync(entityFilePath, entries);
};

// function deletes entity
export const deleteEntity = ({
  entityName,
  entitiesPath,
}: IDeleteEntityPayload): void => {
  // define entity dir path
  const entityDirPath: string = mergePaths(entitiesPath, entityName);

  // delete dir
  fs.removeSync(entityDirPath);
};

// function extracts entities from file
export const getEntities = (): IEntity[] => {
  const entityFileEntries = fs.readFileSync(ENTITY_CONFIG_PATH, {
    encoding: 'utf8',
  });
  const { entities } = JSON.parse(entityFileEntries);

  return entities;
};
