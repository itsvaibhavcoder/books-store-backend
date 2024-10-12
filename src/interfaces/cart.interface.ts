import { Document, ObjectId } from 'mongoose';
import { IBook } from './book.interface';

export interface ICart extends Document {
  createdBy: ObjectId;  
  books: IBook;   
  cartTotal: number;    
}
