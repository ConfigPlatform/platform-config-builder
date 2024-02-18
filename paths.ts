const { mergePaths } = require('./helpers');

export const ROOT_PATH = process.cwd();

export const ENTITIES_PATH = mergePaths(ROOT_PATH, '/generated/entities');

export const HANDLERS_PATH = mergePaths(ROOT_PATH, '/generated/handlers');

export const ENTITY_MAP_PATH = mergePaths(ROOT_PATH, '/generated/entityMap.ts');

export const PAGE_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.page.json',
);

export const MENU_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.menu.json',
);

export const MODAL_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.modal.json',
);

export const SIDEPANEL_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.sidepanel.json',
);

export const FOOTER_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.footer.json',
);

export const SERVER_ROOT_PATH = mergePaths(process.cwd(), '../platform-server');

export const SERVER_ENTITIES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/entities',
);

export const SERVER_HANDLERS_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/handler',
);

export const SERVER_ENTITY_MAP_PATH = mergePaths(
  SERVER_ENTITIES_PATH,
  'entityMap.ts',
);

export const SERVER_PAGE_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.page.json',
);

export const SERVER_MENU_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.menu.json',
);

export const SERVER_MODAL_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.modal.json',
);

export const SERVER_SIDEPANEL_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.sidepanel.json',
);

export const SERVER_FOOTER_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.footer.json',
);