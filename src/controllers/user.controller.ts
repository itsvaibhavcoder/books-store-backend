/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { generateToken} from '../utils/tokenUtils';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await this.UserService.signUp(req.body);
      const {password, ...rest_data} = user.toObject();
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: rest_data,
        message: 'User Registered'
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
      const user = await this.UserService.login(req.body.email, req.body.password);
      if(user){
        const generatedToken = generateToken({
          UserID: user._id.toString(),
          email: user.email
        });
        const {firstName, email, ...rest_data} = user.toObject();

        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: {
            firstName,
            email,
            generatedToken
          },
          message: 'User logged In'
        });
      }
      else{
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            data: "",
            message: 'Invalid Email or Password.'
        });
      }
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: 'Invalid Email or Password.'
      });
    }
  };

  public forgetPassword = async(req:Request, res: Response, next: NextFunction ):Promise<void>=>{
    try{
      const resetToken = await this.UserService.forgetPassword(req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'reset password link sent successfully',
      });
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message,
      });
    }
  };

  public resetPassword = async (req: Request, res: Response, next:NextFunction): Promise<void>=>{
    try{
      const {token, newPassword} = req.body;
      await this.UserService.resetPassword(token, newPassword);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: "",
        message: 'Password reset successful',
      });
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message,
      });
    }
  };
  
}

export default UserController;
