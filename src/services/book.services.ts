import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import User from '../models/user.model';

class BookService {
  constructor() {
    console.log('BookService instantiated...');
  }

  // Book service for adding a book
  public addBook = async (body: IBook): Promise<IBook> => {
    console.log('Inside BookService.addBook...');
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

  //Book service for updating book
  public updateBook = async (
    bookId: string,
    body: Partial<IBook>
  ): Promise<IBook | null> => {
    const user = await User.findById(body.userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'admin')
      throw new Error('Only admin users can update books');
     const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
      new: true
    });
    if (!updatedBook) throw new Error('Book not found');
    return updatedBook;
  };

  //Book service for deleting book
  public deleteBook = async (
    bookId: string,
    userId: string
  ): Promise<IBook | null> => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'admin')
      throw new Error('Only admin users can delete books');

    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');
    await book.remove();
    return book;
  };
}

export default BookService;