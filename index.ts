import {
  updateEntities,
  updateEntityMap,
  moveToServer,
  updateHandlers,
  loadConfig,
} from './configurator';
import 'dotenv/config';

(async () => {
  loadConfig();

  updateEntities();
  updateEntityMap();

  await updateHandlers();

  moveToServer();
})();
