import { IEntity } from './_config/types/config.entity';
import * as fs from 'fs-extra';
import {
  ICreateModuleImportPayload,
  createClassName,
  createModuleImport,
  mergePaths,
} from './helpers';
import { deleteEntity, getEntities, updateEntity } from './entity';
import { deleteHandler, getHandlers, updateHandler } from './handler/handler';
import {
  ENTITIES_PATH,
  ENTITY_MAP_PATH,
  FOOTER_CONFIG_PATH,
  FOOTER_TYPES_PATH,
  HANDLERS_PATH,
  NAVBAR_CONFIG_PATH,
  MENU_TYPES_PATH,
  MODAL_CONFIG_PATH,
  MODAL_TYPES_PATH,
  PAGE_CONFIG_PATH,
  PAGE_TYPES_PATH,
  ROOT_PATH,
  SERVER_ENTITIES_PATH,
  SERVER_ENTITY_MAP_PATH,
  SERVER_FOOTER_CONFIG_PATH,
  SERVER_FOOTER_TYPES_PATH,
  SERVER_HANDLERS_PATH,
  SERVER_NAVBAR_CONFIG_PATH,
  SERVER_MENU_TYPES_PATH,
  SERVER_MODAL_CONFIG_PATH,
  SERVER_MODAL_TYPES_PATH,
  SERVER_PAGE_CONFIG_PATH,
  SERVER_PAGE_TYPES_PATH,
  SERVER_SIDEPANEL_CONFIG_PATH,
  SERVER_SIDEPANEL_TYPES_PATH,
  SIDEPANEL_CONFIG_PATH,
  SIDEPANEL_TYPES_PATH,
} from './paths';
import { IHandler } from './_config/types/config.handler';
import * as process from 'process';

const { CONFIG_PATH } = process.env;

export const updateEntities = (): void => {
  // if /generated/entities path isn't valid, we should create dirs recursively
  fs.ensureDirSync(ENTITIES_PATH);

  // get entity dir entries
  const entityDirEntries = fs.readdirSync(ENTITIES_PATH);

  // get entities from config file
  const entities = getEntities();

  // loop through entityDirEntries to define entities for deletion
  for (const entityName of entityDirEntries) {
    // check if we have entity with such name in config. entityMap - exception, we shouldn't delete this file
    const existsInConfig = !!entities.find(
      (entity) => entity.entityName === entityName,
    );

    // delete entity if entity isn't in config
    if (!existsInConfig) {
      deleteEntity({ entityName, entitiesPath: ENTITIES_PATH });
    }
  }

  // loop through entities in config to refresh
  for (const entityData of entities) {
    // update entity
    updateEntity(entityData as IEntity);
  }
};

// function generates entity map file, file is used for accessing entities directly through one object
export const updateEntityMap = (): void => {
  const moduleImportPayloads: ICreateModuleImportPayload[] = [];
  let entityMapObjEntries = '';

  // get entities from config file
  const entities = getEntities();

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
    const entityMapData = `  ${className}`;

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
};

// function generates handlers
export const updateHandlers = async (): Promise<void> => {
  // if /generated/handlers path isn't valid, we should create dirs recursively
  fs.ensureDirSync(HANDLERS_PATH);

  // get handlers dir entries
  const handlerDirEntries = fs.readdirSync(HANDLERS_PATH);

  // get handlers from config file
  const handlers = getHandlers();

  // loop through handlerDirEntries to define handler for deletion
  for (const handlerFile of handlerDirEntries) {
    const handlerName = handlerFile.slice(0, handlerFile.length - 3);

    // check if we have handler with such name in config
    const existsInConfig = !!handlers.find((el) => handlerName === el.name);

    // delete handler if handler isn't in config
    if (!existsInConfig) {
      deleteHandler({ handlerName, handlersPath: HANDLERS_PATH });
    }
  }

  // loop through handlers in config to refresh
  for (const handler of handlers) {
    // update handler
    await updateHandler(handler as IHandler);
  }
};

// function cleanups server: removes not actual components
export const serverCleanup = (): void => {
  // get entity dir entries
  const entityDirEntries = fs.readdirSync(SERVER_ENTITIES_PATH);

  // get entities from config file
  const entities = getEntities();

  for (const entityName of entityDirEntries) {
    // check if we have entity with such name in config. entityMap - exception, we shouldn't delete this file
    const existsInConfig = !!entities.find(
      (el) => entityName === el.entityName || entityName === 'entityMap.ts',
    );

    // delete entity if entity isn't in config
    if (!existsInConfig) {
      deleteEntity({ entityName, entitiesPath: SERVER_ENTITIES_PATH });
    }
  }

  // get handler dir entries
  const handlerDirEntries = fs.readdirSync(SERVER_HANDLERS_PATH);

  // loop through handlerDirEntries to define handler for deletion
  for (const handlerFile of handlerDirEntries) {
    // system files - manually created nest files with specific ends
    const systemFileEnds = [
      'spec.ts',
      'controller.ts',
      'module.ts',
      'service.ts',
    ];

    const systemFile = systemFileEnds.some((el) => handlerFile.includes(el));

    // skip checks if file is system file
    if (systemFile) continue;

    const handlerName = handlerFile.slice(0, handlerFile.length - 3);

    // check if we have handler with such name in config
    const existsInConfig = !!entities.find(
      (el) => handlerName === el.entityName,
    );

    // delete handler if handler isn't in config
    if (!existsInConfig) {
      deleteHandler({ handlerName, handlersPath: SERVER_HANDLERS_PATH });
    }
  }
};

// function uploads updates to server
export const moveToServer = (): void => {
  // server cleanup
  serverCleanup();

  const paths: [string, string][] = [
    [ENTITY_MAP_PATH, SERVER_ENTITY_MAP_PATH],
    [ENTITIES_PATH, SERVER_ENTITIES_PATH],
    [HANDLERS_PATH, SERVER_HANDLERS_PATH],
    [PAGE_CONFIG_PATH, SERVER_PAGE_CONFIG_PATH],
    [NAVBAR_CONFIG_PATH, SERVER_NAVBAR_CONFIG_PATH],
    [SIDEPANEL_CONFIG_PATH, SERVER_SIDEPANEL_CONFIG_PATH],
    [MODAL_CONFIG_PATH, SERVER_MODAL_CONFIG_PATH],
    [FOOTER_CONFIG_PATH, SERVER_FOOTER_CONFIG_PATH],
    [FOOTER_TYPES_PATH, SERVER_FOOTER_TYPES_PATH],
    [PAGE_TYPES_PATH, SERVER_PAGE_TYPES_PATH],
    [MODAL_TYPES_PATH, SERVER_MODAL_TYPES_PATH],
    [SIDEPANEL_TYPES_PATH, SERVER_SIDEPANEL_TYPES_PATH],
    [MENU_TYPES_PATH, SERVER_MENU_TYPES_PATH],
  ];

  // copy files & dirs
  paths.forEach((el) => fs.copySync(...el));
};

// function copies config from config dir
export const loadConfig = () => {
  const configDirEntries = fs.readdirSync(CONFIG_PATH);

  const configFiles = configDirEntries.filter((el) => el.includes('.json'));

  // loop through config files to update local files
  for (const configFile of configFiles) {
    const filePath = mergePaths(CONFIG_PATH, configFile);
    const destFilePath = mergePaths(ROOT_PATH, '_config', configFile);

    // copy file if file doesn't exist
    if (!fs.existsSync(destFilePath)) {
      fs.copyFileSync(filePath, destFilePath);
      continue;
    }

    // update file content if file already exists
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    fs.writeFileSync(destFilePath, content);
  }
};
