import { configPassport } from './components/auth/passport';
import { chattingMqtt } from './components/chatting';
import { loadDb } from './loader/loadDb';
import { loadServer } from './loader/loadServer';
import { registerRouter } from './route';

async function startServer () {

  await loadDb();
  configPassport();
  registerRouter();

  await loadServer();
  chattingMqtt.connect();
}

startServer();
