import { Connection } from "typeorm";
import jwt from 'jsonwebtoken';
import { Users } from "../../database/entities/users.entity";
import { AuthenticationError } from "apollo-server-express";
// export type TokensResponse = {
//   accessToken: string;
//   renewToken: string;
// };

// export type LoginArgs = {
//   email: string;
//   password: string;
// };

// const loginArgValidation = (arg: any) => {
//   const schema = Joi.object({
//     email: Joi.string().trim().email().required(),
//     password: Joi.string().trim().required(),
//   });
//   return schema.validate(arg);
// }

export interface IUserInfo {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}

// export const getInfo = async (
//   parent: undefined,
//   args: undefined,
//   context: PrivateServerContext,
// ): Promise<IUserInfo> => {
//   context
//   const dbUser = await context.connection.getRepository(Users).findOne({ email: email });

//   const isPasswordValid = await dbUser.comparePassword(args.password);
//   if (!isPasswordValid) {
//     throw new UserInputError('UserInputError', {
//       message: 'Password is incorrect', data: { email: email, }
//     });
//   }
//   // generate tokens
//   const tokenPayload: TokenPayload = { userId: dbUser.id };
//   const accessToken = jwt.sign(tokenPayload, Config.TokenConfig.secret, { expiresIn: Config.TokenConfig.expiresIn });
//   const renewToken = jwt.sign(tokenPayload, Config.TokenConfig.renewTokenSecret, { expiresIn: Config.TokenConfig.renewExpiresIn });
//   return { accessToken, renewToken };
// }

export const getUserFromToken = async (connection: Connection, authorizationToken: string | undefined): Promise<IUserInfo | undefined> => {
  if (!authorizationToken) {
    return;
  }
  const tokenPayload = jwt.decode(authorizationToken, { json: true });
  if (!tokenPayload) {
    throw new AuthenticationError('Incorrect token');
  }
  const dbUser = await connection.getRepository(Users).findOne({ id: tokenPayload.userId });
  if (!dbUser) {
    throw new AuthenticationError('Token user not found');
  }
  return {
    userId: dbUser.id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
  };
}

// export const getInfo = async () =>{
//   return null
// }