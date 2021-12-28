import { Controller } from "../../controller";
import { OpenServerContext } from "../../types/interface/global.interface";

const resolverMap = {
  Query: {
    test: (_: any, args: any, ctx: OpenServerContext) => {
      return "test";
    }
  },
  Mutation: {
    login: Controller.AuthController.login,
    register: Controller.AuthController.register,
  },
};

export default resolverMap;