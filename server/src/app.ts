import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { config } from './config';

const app = express();
app.use(morgan('dev'));
app.use(cors(config.server.cors));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
// app.use(passport.initialize());

export default app;
