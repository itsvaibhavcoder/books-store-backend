import { Document } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  bookIds: string[];
  totalAmount: number;
  orderDate: Date;
  status: string;
}
