import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
  {
    bookName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    bookImage: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    admin_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IBook>('Book', bookSchema);
