import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs'
import { v4 as uuidv4 } from 'uuid';

import { StorageService } from '@shared/services'
import { Book } from '@types'

const BOOKS_STORAGE_KEY = 'books';

const initialBooks: Book[] = [
  {
    id: uuidv4(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    description: 'The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.'
  },
  {
    id: uuidv4(),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    description: 'The story takes place during three years of the Great Depression in the fictional "tired old town" of Maycomb, Alabama.'
  },
  {
    id: uuidv4(),
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    description: 'The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda.'
  },
  {
    id: uuidv4(),
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    description: 'The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school.'
  },
  {
    id: uuidv4(),
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    year: 1954,
    description: 'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J.R.R. Tolkien. The story began as a sequel to Tolkien\'s 1937 children\'s book The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold. The novel is set in the fictional world of Middle-earth and follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron to control the other Rings of Power and conquer Middle-earth. The story is divided into three volumes: The Fellowship of the Ring, The Two Towers, and The Return of the King. It features a diverse cast of characters, including hobbits, elves, dwarves, men, and wizards, who form the Fellowship of the Ring to undertake the perilous journey to Mount Doom, where the One Ring can be destroyed. The Lord of the Rings explores themes of friendship, bravery, and the struggle between good and evil. It has been adapted into various media, including a highly successful film trilogy directed by Peter Jackson.'
  }
];

@Injectable()
export class BookStorageService {
  constructor(private storageService: StorageService) {}

  initialBookInsert(): void {
    const books = this.storageService.get<Book[]>(BOOKS_STORAGE_KEY) || [];
    if (books.length) return;
    this.storageService.put(BOOKS_STORAGE_KEY, initialBooks);
  }

  getBooks(): Observable<Book[]> {
    return new Observable<Book[]>((sub) => {
      const books = this.storageService.get<Book[]>(BOOKS_STORAGE_KEY) || [];

      sub.next(books);
      sub.complete();
    }).pipe(delay(1000)); // Simulate loading
  }

  getBookById(id: string): Observable<Book | null> {
    return new Observable<Book | null>((sub) => {
      if (!id) {
        sub.error();
        sub.complete();
        return;
      }

      this.getBooks().subscribe((books) => {
        const book = books.find((b) => b.id === id) || null;

        sub.next(book);
        sub.complete();
      });
    }).pipe(delay(1000)); // Simulate loading
  }

  addBook(book: Partial<Book>): Observable<Book> {
    return new Observable<Book>((sub) => {
      if (!book) {
        sub.error();
        sub.complete();
      }

      const bookWithId = { ...book, id: this.getNewId() } as Book;
      this.getBooks().subscribe((books) => {
        this.storageService.put(BOOKS_STORAGE_KEY, [...books, bookWithId]);

        sub.next(bookWithId);
        sub.complete();
      });
    }).pipe(delay(1000)); // Simulate loading
  }

  updateBook(updatedBook: Book): Observable<Book> {
    return new Observable<Book>((sub) => {
      if (!updatedBook) {
        sub.error();
        sub.complete();
      }

      this.getBooks().subscribe((books) => {
        const updatedBooks = books.map((book) => (book.id === updatedBook.id ? updatedBook : book));
        this.storageService.put(BOOKS_STORAGE_KEY, updatedBooks);

        sub.next(updatedBook);
        sub.complete();
      });
    }).pipe(delay(1000)); // Simulate loading
  }

  deleteBook(bookId: string): Observable<void> {
    return new Observable<void>((sub) => {
      if (!bookId) {
        sub.error();
        sub.complete();
      }

      this.getBooks().subscribe((books) => {
        const updatedBooks = books.filter((b) => b.id !== bookId);
        this.storageService.put(BOOKS_STORAGE_KEY, updatedBooks);

        sub.next();
        sub.complete();
      });
    }).pipe(delay(1000)); // Simulate loading
  }

  private getNewId(): string {
    return uuidv4();
  }
}
