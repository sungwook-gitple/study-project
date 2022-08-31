import mongoose from 'mongoose';

export async function loadDb() {

  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('db connected');
  });
  db.on('error', () => {
    console.error('=== mongoose connection error');
  });

  return await mongoose.connect('mongodb://localhost/resources');
}
