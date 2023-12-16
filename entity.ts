const fs = require('fs-extra');
const { ENTITIES_PATH } = require('./paths');
import { IEntity as IEntityData } from './_config/config.entity';
import { createClassName, createModuleImport, mergePaths } from './helpers';

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

  // class name
  const className = createClassName(entityName);

  // db table columns
  let columns = `\n  @PrimaryGeneratedColumn()\n  id: number;`;

  // loop through fields to generate columns
  for (const field of fields) {
    const { name, type, options } = field;

    const optionArr: [string, string][] = Object.entries(options);
    const optionStr = optionArr.map((el) => `${el[0]}: '${el[1]}'`).join(', ');

    // create column
    const column = `\n\n  @Column({ ${optionStr} })\n  ${name}: ${type};`;

    // add column
    columns += column;
  }

  // module import
  const moduleImport = createModuleImport({
    variable: '{ Column, Entity, PrimaryGeneratedColumn }',
    path: 'typeorm',
  });

  // file entries
  const entries = `${moduleImport};\n\n@Entity()\nexport class ${className} {${columns}\n}`;

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
  const entityDirPath: string = mergePaths(entitiesPath, `/${entityName}`);

  // delete dir
  fs.removeSync(entityDirPath, { recursive: true });
};
