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

  //Update book by Id
  public updateBook = async(req: Request, res:Response, next:NextFunction): Promise<void>=>{
  try{
    const bookId = req.params.id;
    const data = await this.bookService.updateBook(bookId, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book updated successfully',
    });
  }
  catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
  };

  //Delete book
  public deleteBook = async(req:Request, res:Response, next: NextFunction):Promise<void> =>{
    try{
      const bookId = req.params.id;
      const {userId} = req.body;
      const data = await this.bookService.deleteBook(bookId, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book deleted successfully',
      });
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}

export default BookController;