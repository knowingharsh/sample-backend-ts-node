import { Controller } from "../../controller";
import { PrivateServerContext } from "../../types/interface/global.interface";

const resolverMap = {
  Query: {
    testPrivate: (_: any, args: any, ctx: PrivateServerContext) => {
      return "testPrivate";
    },
    getInfo : Controller.UserController.getInfo
  },
  // Mutation: {
    // login: Controller.AuthController.login,
    // register: Controller.AuthController.register,
  // },
};

export default resolverMap;