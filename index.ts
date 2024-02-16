import {
  updateEntities,
  updateEntityMap,
  moveToServer,
  updateHandlers,
} from './configurator';

(async () => {
  updateEntities();
  updateEntityMap();
  await updateHandlers();

  moveToServer();
})();
