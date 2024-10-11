import { Document } from 'mongoose';

export interface IBook extends Document {
  bookName: string;
  author: string;
  description: string;
  price: number;
  discountPrice: number;
  bookImage: string;
  quantity: number;
  admin_user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}