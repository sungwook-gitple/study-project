import app from './app';
import { configPassport } from './components/auth/passport';
import { loadChattingSubscriber } from './loader/loadChattingSubscriber';
import { loadDb } from './loader/loadDb';
import { loadServer } from './loader/loadServer';
import { route } from './route';

async function startServer () {

  console.log('aa', app);
  await loadDb();
  configPassport();
  route();

  await loadServer();
  await loadChattingSubscriber();
}

startServer();
