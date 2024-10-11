import { Document, ObjectId } from 'mongoose';

export interface IBookItem {
  bookTitle: string;
  description: string;
  price: number;
  author: string;
  quantity: number;
  image: string;
}

export interface ICart extends Document {
  createdBy: ObjectId;  
  books: IBookItem[];   
  cartTotal: number;    
}
