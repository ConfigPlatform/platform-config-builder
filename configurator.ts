const fs = require('fs-extra');
import entities, { IEntity } from './config.entity';
import Entity from './entity';
import {
  ICreateModuleImportPayload,
  createClassName,
  createModuleImport,
} from './helpers';

const CURRENT_DIR = process.cwd();

export function updateEntities() {
  const entityDirsPath = `${CURRENT_DIR}/generated/entities`;

  if (!fs.ensureDirSync(entityDirsPath)) {
    fs.mkdirSync(entityDirsPath, { recursive: true });
  }

  const entityDirNames = fs.readdirSync(entityDirsPath);

  for (const entityName of entityDirNames) {
    const existsInConfig = entities.some(
      (entity) =>
        entityName === entity.entityName || entityName === 'entityMap.ts',
    );

    if (existsInConfig) continue;

    const entityData: IEntity = { entityName, fields: [] };
    const entity = new Entity(entityData, entityDirsPath);
    entity.delete();
  }

  for (const entityData of entities) {
    const entity = new Entity(entityData, entityDirsPath);
    entity.apply();
  }
}

export function updateEntityMap() {
  const moduleImportPayloads: ICreateModuleImportPayload[] = [];
  let entityMapObjEntries = '';

  for (const entity of entities) {
    const className = createClassName(entity.entityName);

    const moduleImportPayload: ICreateModuleImportPayload = {
      variable: `{ ${className} }`,
      path: `./${entity.entityName}/${entity.entityName}.entity`,
    };

    moduleImportPayloads.push(moduleImportPayload);

    const entityMapData = `  '${entity.entityName}': ${className}`;

    entityMapObjEntries += `${
      entityMapObjEntries.length ? ',\n' : ''
    }${entityMapData}`;
  }

  const moduleImports = moduleImportPayloads.map(createModuleImport).join('\n');
  const entityMapEntries = `${moduleImports}\n\nexport const ENTITY_MAP: { [key: string]: any } = {\n${entityMapObjEntries}\n}`;
  const entityMapPath = `${CURRENT_DIR}/generated/entityMap.ts`;
  fs.writeFileSync(entityMapPath, entityMapEntries);
}

export function moveToServer() {
  const serverPath = `${process.cwd()}/../platform-server`;

  fs.copyFileSync(
    `${CURRENT_DIR}/generated/entityMap.ts`,
    `${serverPath}/src/entities/entityMap.ts`,
  );
  fs.copySync(
    `${CURRENT_DIR}/generated/entities`,
    `${serverPath}/src/entities`,
  );
  fs.copySync(
    `${CURRENT_DIR}/config.page.ts`,
    `${serverPath}/src/config/config.page.ts`,
  );
  fs.copySync(
    `${CURRENT_DIR}/config.menu.ts`,
    `${serverPath}/src/config/config.menu.ts`,
  );
}
