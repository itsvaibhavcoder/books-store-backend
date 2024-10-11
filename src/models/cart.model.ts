import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

const bookItemSchema = new Schema(
  {
    bookTitle: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
  },
  { _id: false }  
);

const cartSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    books: [bookItemSchema],  
    cartTotal: { type: Number, required: true }   
  },
  {
    timestamps: true 
  }
);

export default model<ICart>('Cart', cartSchema);
