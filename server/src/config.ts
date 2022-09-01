import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  throw new Error('env: required JWT_SECRET');
}

export const config = {
  server: {
    PORT: process.env.SERVER_PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  mqtt: {
    HOST: process.env.MQTT_HOST || '127.0.0.1',
    PORT: Number(process.env.MQTT_PORT) || 1883,
  }
};
