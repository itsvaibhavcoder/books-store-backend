// import { Document } from 'mongoose';


// export interface IWishlist extends Document {
//   userId: string;
//   bookIds: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

import { Document } from 'mongoose';

export interface IWishlist extends Document {
  userId: string;
  bookIds: { bookId: string; bookName: string }[];
  createdAt: Date;
  updatedAt: Date;
}
