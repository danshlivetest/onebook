import { Injectable } from '@angular/core';
import { ModalService } from '@shared/services'
import { Book } from '@types'
import { Observable } from 'rxjs'

import { EditBookModalComponent, EditBookModalData } from '../components/modals/edit-book/edit-book-modal.component'

@Injectable()
export class BookModalsService {
  constructor(private modalService: ModalService) {}

  openEditBookModal(book?: Book): Observable<Book> {
    return this.modalService.openModal<EditBookModalData, Book>(EditBookModalComponent, {
      data: { header: !book ? 'Add new book' : 'Edit book info', book },
    });
  }
}
