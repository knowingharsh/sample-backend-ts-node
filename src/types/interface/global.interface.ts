import { Connection } from "typeorm";

export interface OpenServerContext {
  connection: Connection;
}


export interface TokenPayload {
  userId?: string;
}
export interface PrivateServerContext extends TokenPayload {
  connection: Connection;
}
