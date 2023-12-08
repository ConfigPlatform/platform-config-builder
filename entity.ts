const fs = require('fs');
const path = require('path');

import { IEntity as IEntityData } from './_config/config.entity';
import { createClassName, createModuleImport } from './helpers';

export default class Entity {
  private entityData: IEntityData;
  private entityDirsPath: string;

  constructor(entityData: IEntityData, entityDirsPath: string) {
    this.entityData = entityData;
    this.entityDirsPath = entityDirsPath;
  }

  // function creates entity file entries
  private createFileEntries() {
    const { entityName, fields } = this.entityData;

    // class name
    const className = createClassName(entityName);

    // db table columns
    let columns: string = `\n  @PrimaryGeneratedColumn()\n  id: number;`;

    // loop through fields to generate columns
    for (const field of fields) {
      const { name, type, options } = field;

      const optionArr: [string, string][] = Object.entries(options);
      const optionStr = optionArr
        .map((el) => `${el[0]}: '${el[1]}'`)
        .join(', ');

      // create column
      const column = `\n\n  @Column({ ${optionStr} })\n  ${name}: '${type}';`;

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

    return entries;
  }

  // function applies entity
  apply() {
    const { entityName } = this.entityData;

    // define entity dir path
    const entityDirPath: string = path.join(
      this.entityDirsPath,
      `/${entityName}`,
    );

    // create dir if not exists
    if (!fs.existsSync(entityDirPath)) {
      fs.mkdirSync(entityDirPath);
    }

    // entity file path
    const entityFilePath = path.join(entityDirPath, `${entityName}.entity.ts`);

    // updated file entries
    const updatedFileEntries = this.createFileEntries();

    // update entity file
    fs.writeFileSync(entityFilePath, updatedFileEntries);
  }

  // function deletes entity
  delete() {
    const { entityName } = this.entityData;

    // define entity dir path
    const entityDirPath: string = path.join(
      this.entityDirsPath,
      `/${entityName}`,
    );

    // delete dir
    fs.rmdirSync(entityDirPath, { recursive: true });
  }
}
