import { mergePaths } from './helpers';
import * as process from 'process';
import 'dotenv/config';

const { SERVER_PATH } = process.env;

export const ROOT_PATH = process.cwd();

export const ENTITIES_PATH = mergePaths(ROOT_PATH, '/generated/entities');

export const HANDLERS_PATH = mergePaths(ROOT_PATH, '/generated/handlers');

export const ENTITY_MAP_PATH = mergePaths(ROOT_PATH, '/generated/entityMap.ts');

export const PAGE_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.page.json',
);

export const NAVBAR_CONFIG_PATH = mergePaths(
  ROOT_PATH,
  '/_config/config.navbar.json',
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

export const FOOTER_TYPES_PATH = mergePaths(
  ROOT_PATH,
  '/_config/types/config.footer.ts',
);

export const MENU_TYPES_PATH = mergePaths(
  ROOT_PATH,
  '/_config/types/config.menu.ts',
);

export const MODAL_TYPES_PATH = mergePaths(
  ROOT_PATH,
  '/_config/types/config.modal.ts',
);

export const SIDEPANEL_TYPES_PATH = mergePaths(
  ROOT_PATH,
  '/_config/types/config.sidepanel.ts',
);

export const PAGE_TYPES_PATH = mergePaths(
  ROOT_PATH,
  '/_config/types/config.page.ts',
);

export const SERVER_ROOT_PATH = mergePaths(process.cwd(), SERVER_PATH);

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

export const SERVER_NAVBAR_CONFIG_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/config.navbar.json',
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

export const SERVER_FOOTER_TYPES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/types/config.footer.ts',
);

export const SERVER_MENU_TYPES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/types/config.menu.ts',
);

export const SERVER_MODAL_TYPES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/types/config.modal.ts',
);

export const SERVER_SIDEPANEL_TYPES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/types/config.sidepanel.ts',
);

export const SERVER_PAGE_TYPES_PATH = mergePaths(
  SERVER_ROOT_PATH,
  '/src/config/types/config.page.ts',
);
