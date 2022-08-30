import mongoose from 'mongoose';

export function loadDb() {

  return mongoose.connect('mongodb://localhost/resources');
}
