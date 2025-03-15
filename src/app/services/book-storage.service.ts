import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs'
import { v4 as uuidv4 } from 'uuid';

import { StorageService } from '@shared/services'
import { Book } from '@types'

const BOOKS_STORAGE_KEY = 'books';

@Injectable()
export class BookStorageService {
  constructor(private storageService: StorageService) {}

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

  addBook(book: Book): Observable<Book> {
    return new Observable<Book>((sub) => {
      if (!book) {
        sub.error();
        sub.complete();
      }

      const bookWithId = { ...book, id: this.getNewId() };
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

  private getNewId(): string {
    return uuidv4();
  }
}
