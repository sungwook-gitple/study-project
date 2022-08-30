import app from './app';
import { PORT } from './config';
import { loadDb } from './loader/loadDb';
import { route } from './route';

async function startServer () {

  await loadDb();

  route();

  app.listen(PORT, () => {
    console.log(`server listen at ${PORT}`);
  });
}

startServer();
