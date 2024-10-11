import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
class UserService {

  //Create new user (Admin or Customer)
  public signUp = async (body: IUser): Promise<IUser> => {
    const existingUser = await User.findOne({email: body.email});
    if(existingUser){
      throw new Error('Email already exists');
    }
    const data = await User.create(body);
    return data;
  };

  //Log in user
  public login = async(email: string, password:string): Promise<any>=>{
    const user = await User.findOne({email}).exec();
    if(user){
      const validate = await bcrypt.compare(password, user.password);
      if(validate){
        return user;
      }
      return false;
    }
    return false;
  };

}

export default UserService;
