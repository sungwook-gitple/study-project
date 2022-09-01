import express from 'express';
import morgan from 'morgan';
import passport from 'passport';

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(passport.initialize());

export default app;
