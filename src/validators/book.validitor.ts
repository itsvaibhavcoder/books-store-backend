import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class BookValidator {
  public validateBook = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const schema = Joi.object({
      bookName: Joi.string().min(3).required(),
      description: Joi.string().required(),
      author: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().min(0).required(),
      discountPrice: Joi.number().min(0),
      bookImage: Joi.string().uri().required(),
      userId: Joi.string().required()
    });

    const {error, value} = schema.validate(req.body);
    if(error){
        throw Error('Error' + error.message);
    }
    next();
  };
}

export default BookValidator;