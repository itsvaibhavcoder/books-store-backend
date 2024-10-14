import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookIds: {
      type: [String],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export default model<IOrder>('Order', OrderSchema);
