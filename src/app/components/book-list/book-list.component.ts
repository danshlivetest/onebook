import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';

import { IconColor, ButtonComponent } from '@shared/components';
import { BookModalsService, BookStorageService } from '@services'
import { SubsriptionsService } from '@shared/services'
import { Book } from '@types'
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component'
import { Pending } from '@shared/utils';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingSpinnerComponent],
  providers: [BookModalsService, SubsriptionsService, BookStorageService]
})
export class BookListComponent extends Pending implements OnInit {
  readonly IconColor = IconColor;

  books: Book[] = [];

  constructor(
    private bookModalsService: BookModalsService,
    private subsriptions: SubsriptionsService,
    private bookStorageService: BookStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  addNewBook(): void {
    this.subsriptions.add(
      this.bookModalsService.openEditBookModal().subscribe((book: Partial<Book>) => {
        if (!book) return;
      })
    );
  }

  private fetchBooks(): void {
    this.subsriptions.add(
     this.wait(this.bookStorageService.getBooks()).subscribe((books: Book[]) => {
        this.books = books;
      })
    );
  }
}
