import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

class WishlistService {
  public addToWishlist = async (bookId: string, userId: string) => {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error(`No book found for the ID ${bookId}`);
    }

    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      if (wishlist.bookIds.some((item) => item.bookId === bookId)) {
        throw new Error('Book is already in the wishlist');
      }
      wishlist.bookIds.push({ bookId, bookName: book.bookName });
      await wishlist.save();
      return wishlist;
    } else {
      const newWishlist = await Wishlist.create({
        userId,
        bookIds: [{ bookId, bookName: book.bookName }],
      });
      return newWishlist;
    }
  };

  public removeFromWishlist = async (bookId: string, userId: string) => {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      throw new Error('No wishlist found for this user');
    }

    const index = wishlist.bookIds.findIndex((item) => item.bookId === bookId);
    if (index !== -1) {
      wishlist.bookIds.splice(index, 1);
      await wishlist.save();
      return wishlist;
    }
    throw new Error('Book not found in wishlist');
  };

  public getWishlist = async (userId: string) => {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      throw new Error('No wishlist found for this user');
    }
    return wishlist;
  };
}

export default WishlistService;
