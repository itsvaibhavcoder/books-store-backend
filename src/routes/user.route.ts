import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { handleRole } from '../middlewares/handleRole.middleware';
import hashingFunction from '../hashing';
class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private Hashing = new hashingFunction();
  constructor() {
    this.routes();
  }

  private routes = () => {
    //Customer Registration
    this.router.post(
      '',
      this.UserValidator.signUpValidate,
      this.Hashing.getEncryptMiddleware(),
      handleRole,
      this.UserController.signUp
    ),

    //Admin registration
    this.router.post(
      '/adminsignup',
      this.UserValidator.signUpValidate,
      this.Hashing.getEncryptMiddleware(),
      handleRole,
      this.UserController.signUp
    );

    this.router.post(
      '/signin',
      this.UserValidator.loginValidate,
      this.UserController.login
    )
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
