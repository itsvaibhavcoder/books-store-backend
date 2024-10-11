import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

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
}

export default UserService;
