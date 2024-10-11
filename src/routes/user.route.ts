import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { handleRole } from '../middlewares/handleRole.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post(
      '',
      this.UserValidator.signUpValidate,
      handleRole,
      this.UserController.signUp
    ),
    
    this.router.post(
      '/adminsignup',
      this.UserValidator.signUpValidate,
      handleRole,
      this.UserController.signUp
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
