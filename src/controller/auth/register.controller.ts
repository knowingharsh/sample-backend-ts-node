import { OpenServerContext } from "../../types/interface/global.interface";
import { Users } from "../../database/entities/users.entity";
import Joi from 'joi';
import { UserInputError } from "apollo-server-express";

export type RegisterArgs = {
  email: string;
  password: string;
};

const registerArgValidation = (arg: any) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(arg);
}

export interface RegisterResponse {
  isRegistered: boolean;
};

export const register = async (
  parent: undefined,
  args: RegisterArgs,
  context: OpenServerContext,
): Promise<RegisterResponse> => {
  const validation = registerArgValidation(args);
  if (validation.error) {
    throw new UserInputError('UserInputError', { ...validation.error.details });
  }
  const email = args.email.trim().toLowerCase();
  const dbUser = await context.connection.getRepository(Users).findOne({ email: email });
  if (!dbUser) { // if user not found, then register
    const newUser = new Users();
    newUser.email = email;
    newUser.password = args.password;
    newUser.firstName = "";
    newUser.lastName = "";
    await context.connection.getRepository(Users).save(newUser);
    return { isRegistered: true };
  }
  return { isRegistered: false };
}
