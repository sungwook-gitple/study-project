import express from 'express';
import mongoose, { Schema } from 'mongoose';
import morgan from 'morgan';
import restful from 'node-restful';

function run () {

  const app = express();
  app.use(morgan('dev'));
  app.use(express.urlencoded({ 'extended' : true }));
  app.use(express.json());

  mongoose.connect('mongodb://localhost/resources');

  const schema = new Schema({
    title: String,
    year: Number,
  });

  const Resource = restful.model('resource', schema)
    .methods(['get', 'post', 'put', 'delete']);

  Resource.register(app, '/resources');

  app.listen(3000);
}

run();
