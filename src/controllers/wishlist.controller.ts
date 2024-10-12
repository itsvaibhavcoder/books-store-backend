// import { Request, Response } from 'express';
// import HttpStatus from 'http-status-codes';
// import Wishlist from '../models/wishlist.model'; // Adjust the import path as necessary
// import Book from '../models/book.model'; // Adjust the import path as necessary

// class WishlistController {
//     // Add an item to the wishlist
//     public addToWishlist = async (req: Request, res: Response): Promise<Response> =>{
//         const bookId = req.params.id; 
//         const userId = req.body.userId;

//         const book = await Book.findById(bookId);
//         if (!book) {
//             return res.status(HttpStatus.BAD_GATEWAY).json({
//                 code: HttpStatus.BAD_GATEWAY,
//                 message: `No book found for the ID ${bookId}`
//             });
//         }

//         const wishlist = await Wishlist.findOne({ userId });
//         if (wishlist) {
//             if (wishlist.bookIds.includes(book.bookName)) {
//                 return res.status(HttpStatus.CONFLICT).json({
//                     code: HttpStatus.CONFLICT,
//                     data: wishlist,
//                     message: 'Book is already in the wishlist'
//                 });
//             }
//             wishlist.bookIds.push(book.bookName);
//             await wishlist.save();
//             return res.status(HttpStatus.OK).json({
//                 code: HttpStatus.OK,
//                 data: wishlist,
//                 message: `Book with ID ${bookId} added to wishlist successfully`
//             });
//         } else {
//             const newWishlist = await Wishlist.create({ userId, bookIds: [book.bookName] });
//             return res.status(HttpStatus.CREATED).json({
//                 code: HttpStatus.CREATED,
//                 data: newWishlist,
//                 message: 'New wishlist created and book added successfully'
//             });
//         }
//     }

//     // Remove an item from the wishlist
//     public removeFromWishlist = async(req: Request, res: Response): Promise<Response>=> {
//         const bookId = req.params.id; 
//         const userId = req.body.userId; 

//         const wishlist = await Wishlist.findOne({ userId });
//         if (!wishlist) {
//             return res.status(HttpStatus.NOT_FOUND).json({
//                 code: HttpStatus.NOT_FOUND,
//                 data: null,
//                 message: 'No wishlist found for this user'
//             });
//         }

//         const book = await Book.findById(bookId);
//         if (!book) {
//             return res.status(HttpStatus.NOT_FOUND).json({
//                 code: HttpStatus.NOT_FOUND,
//                 data: wishlist,
//                 message: 'Book not found in the wishlist'
//             });
//         }

//         const bookToRemove = book.bookName;
//         const index = wishlist.bookIds.indexOf(bookToRemove);
//         if (index !== -1) {
//             wishlist.bookIds.splice(index, 1);
//             await wishlist.save();
//             return res.status(HttpStatus.OK).json({
//                 code: HttpStatus.OK,
//                 data: wishlist,
//                 message: 'Book removed from wishlist successfully'
//             });
//         }

//         return res.status(HttpStatus.NOT_FOUND).json({
//             code: HttpStatus.NOT_FOUND,
//             message: 'Book not found in wishlist'
//         });
//     }

//     // Get wishlist for the user
//     public getWishlist = async (req: Request, res: Response): Promise<Response>=> {
//         const userId = req.body.userId;

//         const wishlist = await Wishlist.findOne({ userId });
//         if (!wishlist) {
//             return res.status(HttpStatus.BAD_GATEWAY).json({
//                 code: HttpStatus.BAD_GATEWAY,
//                 message: 'No wishlist found for this user'
//             });
//         }

//         return res.status(HttpStatus.OK).json({
//             code: HttpStatus.OK,
//             data: wishlist,
//             message: "Here is the wishlist for the user"
//         });
//     }
// }

// export default WishlistController;


import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

class WishlistController {
  // Add an item to the wishlist
  public addToWishlist = async (req: Request, res: Response): Promise<Response> => {
    const bookId = req.params.id; // Extract bookId from URL
    const userId = req.body.userId;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        code: HttpStatus.BAD_GATEWAY,
        message: `No book found for the ID ${bookId}`,
      });
    }

    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      // Check if book already exists in the wishlist
      if (wishlist.bookIds.some((item) => item.bookId === bookId)) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          data: wishlist,
          message: 'Book is already in the wishlist',
        });
      }
      // Add bookId and bookName to the wishlist
      wishlist.bookIds.push({ bookId, bookName: book.bookName });
      await wishlist.save();
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: wishlist,
        message: `Book with ID ${bookId} added to wishlist successfully`,
      });
    } else {
      // Create a new wishlist if one does not exist
      const newWishlist = await Wishlist.create({
        userId,
        bookIds: [{ bookId, bookName: book.bookName }],
      });
      return res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: newWishlist,
        message: 'New wishlist created and book added successfully',
      });
    }
  };

  // Remove an item from the wishlist
  public removeFromWishlist = async (req: Request, res: Response): Promise<Response> => {
    const bookId = req.params.id; // Extract bookId from URL
    const userId = req.body.userId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: null,
        message: 'No wishlist found for this user',
      });
    }

    const index = wishlist.bookIds.findIndex((item) => item.bookId === bookId);
    if (index !== -1) {
      // Remove the book from the wishlist
      wishlist.bookIds.splice(index, 1);
      await wishlist.save();
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: wishlist,
        message: 'Book removed from wishlist successfully',
      });
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: 'Book not found in wishlist',
    });
  };

  // Get wishlist for the user
  public getWishlist = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.body.userId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        code: HttpStatus.BAD_GATEWAY,
        message: 'No wishlist found for this user',
      });
    }

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: wishlist,
      message: 'Here is the wishlist for the user',
    });
  };
}

export default WishlistController;
