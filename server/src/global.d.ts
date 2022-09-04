declare module 'node-restful' {
  import { Application, RequestHandler } from 'express';
  import { Schema } from "mongoose";

  interface RestfulModel {
    methods(methods: string[]): RestfulModel
    register(app: Application, string: string)
    route(path: string, handler: RequestHandler)
    before(path: string, handler: RequestHandler)
    after(path: string, handler: RequestHandler)
  }

  export function model(resource: string, schema: Schema<any, any>): RestfulModel
}
