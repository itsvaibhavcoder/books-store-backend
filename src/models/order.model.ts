import mongoose, { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const orderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: {
    type: [
      {
        bookName: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        bookImage: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        author: { type: String, required: true },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      }
    ],
    required: true,
    default: [],
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingAddress: {
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
  },
}, { timestamps: true });

export default model<IOrder>('Order', orderSchema);
