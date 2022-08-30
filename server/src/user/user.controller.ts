import restful from 'node-restful';
import app from '../app';
import { userSchema } from '../db/model/user';

export default function routeUser() {

  restful.model('user', userSchema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, '/users');

}
