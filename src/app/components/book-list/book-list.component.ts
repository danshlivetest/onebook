import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core';

import { IconColor, ButtonComponent, Action, SearchComponent } from '@shared/components';
import { BookModalsService, BookStorageService } from '@services'
import { SubsriptionsService } from '@shared/services'
import { Book } from '@types'
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component'
import { Pending } from '@shared/utils';
import { BookCardComponent } from './book-card/book-card.component'
import { ICON } from '@shared/consts'
import { FilterPipe } from '@shared/pipes'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingSpinnerComponent, BookCardComponent, SearchComponent, FilterPipe],
  providers: [BookModalsService, SubsriptionsService, BookStorageService]
})
export class BookListComponent extends Pending implements OnInit {
  readonly IconColor = IconColor;
  readonly addIcon = ICON.ADD;
  readonly search = signal('');

  books = signal<Book[]>([]);
  popoverActions: Action[] = [];

  constructor(
    private bookModalsService: BookModalsService,
    private subsriptions: SubsriptionsService,
    private bookStorageService: BookStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.bookStorageService.initialBookInsert();
    this.preparePopoverActions();
    this.fetchBooks();
  }

  addNewBook(): void {
    this.subsriptions.add(
      this.bookModalsService.openEditBookModal().subscribe((book: Partial<Book>) => {
        if (!book) return;
        this.saveNewBook(book);
      })
    );
  }

  private preparePopoverActions(): void {
    this.popoverActions = [
      {
        label: 'Open details',
        whenClicked: this.openDetails.bind(this)
      },
      {
        label: 'Edit',
        whenClicked: this.editBook.bind(this)
      },
      {
        label: 'Delete',
        color: 'red',
        whenClicked: this.deleteBook.bind(this)
      }
    ];
  }

  private openDetails(book: Book): void {
    this.subsriptions.add(
      this.bookModalsService.openBookInfoModal(book).subscribe()
    );
  }

  private editBook(book: Book): void {
    this.subsriptions.add(
      this.bookModalsService.openEditBookModal(book).subscribe((editedBook: Partial<Book>) => {
        if (!editedBook) return;
        const updatedBook = { id: book.id, ...editedBook} as Book;
        this.updateBook(updatedBook);
      })
    );
  }

  private deleteBook(book: Book): void {
    this.subsriptions.add(
      this.bookModalsService.confirmDeleteBook().subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.proceedDeletion(book.id);
      })
    );
  }

  private fetchBooks(): void {
    this.subsriptions.add(
     this.wait(this.bookStorageService.getBooks()).subscribe((books: Book[]) => {
        this.books.set(books);
      })
    );
  }

  private saveNewBook(book: Partial<Book>): void {
    this.subsriptions.add(
      this.wait(this.bookStorageService.addBook(book)).subscribe({
        next: (book: Book) => {
          this.books.set([...this.books(), book]);
        },
        error: () => {
          console.error('Error saving book'); // It would be better to show a notification, but it's out of scope at the
        }
      })
    );
  }

  private updateBook(updatedBook: Book): void {
    this.subsriptions.add(
      this.wait(this.bookStorageService.updateBook(updatedBook)).subscribe({
        next: () => {
          this.fetchBooks();
        },
        error: () => {
          console.error('Error updating book'); // It would be better to show a notification, but it's out of scope at the moment.
        }
      })
    );
  }

  private proceedDeletion(bookId: string): void {
    this.subsriptions.add(
      this.wait(this.bookStorageService.deleteBook(bookId)).subscribe({
        next: () => {
          this.fetchBooks();
        },
        error: () => {
          console.error('Error deleting book'); // It would be better to show a notification, but it's out of scope at the moment.
        }
      })
    );
  }
}
