import { OpenServerContext, TokenPayload } from "../../types/interface/global.interface";
import { Users } from "../../database/entities/users.entity";
import Joi from 'joi';
import { UserInputError } from "apollo-server-express";
import util from 'util';
import jwt from 'jsonwebtoken';
import { Config } from "../../configuration";
import { Logs } from "../../library/logger";

export type TokensResponse = {
  accessToken: string;
  renewToken: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

const loginArgValidation = (arg: any) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(arg);
}

export const login = async (
  parent: undefined,
  args: LoginArgs,
  context: OpenServerContext,
): Promise<TokensResponse> => {
  const validation = loginArgValidation(args);
  validation.value.email = validation.value.email.toLowerCase();
  if (validation.error) {
    throw new UserInputError('UserInputError', { ...validation.error.details });
  }
  const email = args.email.trim().toLowerCase();
  const dbUser = await context.connection.getRepository(Users).findOne({ email: email });
  if (!dbUser) { // if user not found, then error
    throw new UserInputError('UserInputError', {
      message: 'User not found', data: { email: email, }
    });
  }
  const isPasswordValid = await dbUser.comparePassword(args.password);
  if (!isPasswordValid) {
    throw new UserInputError('UserInputError', {
      message: 'Password is incorrect', data: { email: email, }
    });
  }
  // generate tokens
  const tokenPayload :TokenPayload = { userId: dbUser.id };
  const accessToken = jwt.sign(tokenPayload, Config.TokenConfig.secret, { expiresIn: Config.TokenConfig.expiresIn });
  const renewToken = jwt.sign(tokenPayload, Config.TokenConfig.renewTokenSecret, { expiresIn: Config.TokenConfig.renewExpiresIn });
  return { accessToken, renewToken };
}




