import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.services';

class BookController {
  private bookService = new BookService();

  //addBook
  public addBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Inside addBook...");
    try {
      const data = await this.bookService.addBook(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book added successfully',
      });
    } catch (error) {
      console.error("Error in addBook:", error);  
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };

  //getAllBooks
  public getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.bookService.getAllBooks();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Books retrieved successfully',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  };
}

export default BookController;
