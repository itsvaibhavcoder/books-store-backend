// import { Schema, model } from 'mongoose';
// import {IWishlist} from '../interfaces/wishlist.interface'
// const WishlistSchema: Schema = new Schema(
//     {
//       userId: {
//         type: String,
//         required: true,
//       },
//       bookIds: {
//         type: [String],
//         required: true,
//         default: [],
//       },
//     },
//     {
//       timestamps: true, 
//     }
// );
  
// export default model<IWishlist>('Wishlist', WishlistSchema);


import { Schema, model } from 'mongoose';
import { IWishlist } from '../interfaces/wishlist.interface';

const WishlistSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookIds: [
      {
        bookId: { type: String, required: true },
        bookName: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IWishlist>('Wishlist', WishlistSchema);
