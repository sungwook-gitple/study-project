import { Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import passport from 'passport';
import app from '../app';
import { User } from '../db/model/user';
import { signup } from './auth.service';

export function routeAuth() {

  app.get('/signin', async (req: Request<User>, res) => {
    console.log('=== /signin', req.query)
    const { username, password } = req.query

    try {

      // await signin(username, password)
      // res.json({
      //   message: 'success'
      // })
      passport.authenticate('local', { session: false }, (err, user) => {
        console.log('== authenticate');
        if (err) {
          throw new Error('Unathorized');
        }
        if (!user) {
          throw new Error('not founded');
        }
    
        res.json({
          message: 'success'
        })
      });
      
    } catch(e) {
      res.status(StatusCodes.UNAUTHORIZED)
        .json({
          message: ReasonPhrases.UNAUTHORIZED,
          user: {
            username,
            password
          }
        })
    }
  })

  app.post('/signup', async (req: Request<User>, res) => {

    const { name, username, password } = req.params

    try {

      await signup(name, username, password)
      res.json({
        message: 'success'
      })
    } catch(e) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({
          message: 'fail'
        })
    }
  })
}