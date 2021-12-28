import { Connection } from "typeorm";

export interface OpenServerContext {
  connection: Connection;
}

export interface IUserInfo {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}
export interface TokenPayload {
  userId?: string;
}
export interface PrivateServerContext  {
  user: IUserInfo;
  connection: Connection;
}
