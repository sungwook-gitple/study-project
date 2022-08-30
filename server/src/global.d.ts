declare module 'node-restful' {
  import { Schema } from "mongoose";
  export function model(resource: string, schema: Schema<any, any>)
}
