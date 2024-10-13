import express, { IRouter } from 'express';
import bookValidator from '../validators/book.validitor';
import bookController from '../controllers/book.controller'
import { userAuth } from '../middlewares/auth.middleware';
class BookRoutes {
 private BookValidator = new bookValidator();
 private BookController = new bookController();
 private router = express.Router();
  constructor() {
    this.routes();
  }

  private routes = ()=>{
    
    //Add book 
     this.router.post(
        '/',
      this.BookValidator.validateBook,
      userAuth,
      this.BookController.addBook
     ),

     //Get all Books
     this.router.get(
        '/',
        this.BookController.getAllBooks
     ),

     //Update book by Id
     this.router.put(
      '/:id',
      userAuth,
      this.BookController.updateBook
     ),

     //Delete book by Id
     this.router.delete(
      '/:id',
      userAuth,
      this.BookController.deleteBook
     )
  }

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default BookRoutes;