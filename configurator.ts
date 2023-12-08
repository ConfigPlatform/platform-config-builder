const fs = require('fs-extra');
const {
  ENTITIES_PATH,
  ENTITY_MAP_PATH,
  MENU_CONFIG_PATH,
  PAGE_CONFIG_PATH,
  ROOT_PATH,
  SERVER_ENTITIES_PATH,
  SERVER_ENTITY_MAP_PATH,
  SERVER_MENU_CONFIG_PATH,
  SERVER_PAGE_CONFIG_PATH,
} = require('./paths');
import entities from './_config/config.entity';
import {
  ICreateModuleImportPayload,
  createClassName,
  createModuleImport,
} from './helpers';
import { deleteEntity, updateEntity } from './entity';

// function generates entities
export function updateEntities() {
  // if /generated/entities path isn't valid, we should create dirs recursively
  if (!fs.ensureDirSync(ENTITIES_PATH)) {
    fs.mkdirSync(ENTITIES_PATH, { recursive: true });
  }

  // get entity dir names
  const entityDirNames = fs.readdirSync(ENTITIES_PATH);

  // loop through entityDirNames to define entities for update and deletion
  for (const entityName of entityDirNames) {
    // check if we have entity with such name in config. entityMap - exception, we shouldn't delete this file
    const existsInConfig = entities.some(
      (entity) =>
        entityName === entity.entityName || entityName === 'entityMap.ts',
    );

    // update entity if entity is in config
    if (!existsInConfig) {
      // delete entity
      deleteEntity(entityName);
    }
  }

  // loop through entities in config to refresh
  for (const entityData of entities) {
    // update entity
    updateEntity(entityData);
  }
}

// function generates entity map file, file is used for accessing entities directly through one object
export function updateEntityMap() {
  const moduleImportPayloads: ICreateModuleImportPayload[] = [];
  let entityMapObjEntries = '';

  // loop through entities to fill moduleImportPayloads and entityMapObjEntries
  for (const entity of entities) {
    const className = createClassName(entity.entityName);

    // import payload
    const moduleImportPayload: ICreateModuleImportPayload = {
      variable: `{ ${className} }`,
      path: `./${entity.entityName}/${entity.entityName}.entity`,
    };

    // add import payload
    moduleImportPayloads.push(moduleImportPayload);

    // entity data in format: 'entityName': entity
    const entityMapData = `  '${entity.entityName}': ${className}`;

    // add entity property and value
    entityMapObjEntries += `${
      entityMapObjEntries.length ? ',\n' : ''
    }${entityMapData}`;
  }

  // create module imports and convert to string (each import from new string)
  const moduleImports = moduleImportPayloads.map(createModuleImport).join('\n');

  // file entries
  const entityMapEntries = `${moduleImports}\n\nexport const ENTITY_MAP: { [key: string]: any } = {\n${entityMapObjEntries}\n}`;

  // file path
  const entityMapPath = `${ROOT_PATH}/generated/entityMap.ts`;

  // update file
  fs.writeFileSync(entityMapPath, entityMapEntries);
}

export async function moveToServer() {
  // remove entities dir if exists
  if (fs.pathExistsSync(SERVER_ENTITIES_PATH)) {
    await fs.remove(SERVER_ENTITIES_PATH);
  }

  // create entities dir
  fs.mkdirSync(SERVER_ENTITIES_PATH);

  // copy file & dirs
  fs.copyFileSync(ENTITY_MAP_PATH, SERVER_ENTITY_MAP_PATH);
  fs.copySync(ENTITIES_PATH, SERVER_ENTITIES_PATH);
  fs.copySync(PAGE_CONFIG_PATH, SERVER_PAGE_CONFIG_PATH);
  fs.copySync(MENU_CONFIG_PATH, SERVER_MENU_CONFIG_PATH);
}
