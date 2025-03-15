import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';

import { IconColor, ButtonComponent } from '@shared/components';
import { BookModalsService } from '@services'
import { SubsriptionsService } from '@shared/services'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  providers: [BookModalsService, SubsriptionsService]
})
export class BookListComponent {
  readonly IconColor = IconColor

  constructor(private bookModalsService: BookModalsService, private subsriptions: SubsriptionsService) {}

  addNewBook(): void {
    this.subsriptions.add(
      this.bookModalsService.openEditBookModal().subscribe((book) => {
        console.log('LOG: book', book);
      })
    );
  }
}
