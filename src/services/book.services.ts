import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import User from '../models/user.model';

class BookService {
  constructor() {
    console.log("BookService instantiated...");
  }

  // Book service for adding a book
  public addBook = async (body: IBook): Promise<IBook> => {
    console.log("Inside BookService.addBook...");
    const user = await User.findById(body.userId);
    if (!user) throw new Error('User not found');

    if (user.role !== 'admin') {
      throw new Error('Only admin users can add books');
    }

    const book = new Book(body);
    return await book.save();
  };
  
  // Book service for getting all books
  public getAllBooks = async (): Promise<IBook[]> => {
    const books = await Book.find();
    return books;
  };
}

export default BookService;
