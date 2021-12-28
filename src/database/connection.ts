import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

export const initializeDB = async (): Promise<Connection> => {
  return await createConnection(); // config retires from ormconfig.ts
}