import { environment } from 'src/environments/environment';

const serverConfig = {
  HOST: environment.server.HOST || 'localhost',
  PORT: environment.server.PORT || 8000,
}

const mqttConfig = {
  HOST: environment.mqtt.HOST || '127.0.0.1',
  PORT: environment.mqtt.PORT || 1883,
  WS_PORT: environment.mqtt.WS_PORT || 3999,
}
console.log('=== mqttConfig', mqttConfig);

export default {
  server: serverConfig,
  mqtt: mqttConfig
};
