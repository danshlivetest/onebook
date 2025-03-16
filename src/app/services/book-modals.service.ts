import { Injectable } from '@angular/core';
import { ModalService } from '@shared/services'
import { Book } from '@types'
import { Observable } from 'rxjs'

import { EditBookModalComponent, EditBookModalData } from '../components/modals/edit-book/edit-book-modal.component'
import { BookInfoModalComponent, BookInfoModalComponentData } from '../components/modals/book-info/book-info-modal.component'

@Injectable()
export class BookModalsService {
  constructor(private modalService: ModalService) {}

  openEditBookModal(book?: Book): Observable<Book> {
    return this.modalService.openModal<EditBookModalData, Book>(EditBookModalComponent, {
      data: { header: !book ? 'Add new book' : 'Edit book info', book },
    });
  }

  openBookInfoModal(book: Book): Observable<void> {
    return this.modalService.openModal<BookInfoModalComponentData, void>(BookInfoModalComponent, {
      disableClose: false,
      data: { book }
    });
  }

  confirmDeleteBook(): Observable<boolean> {
    return this.modalService.openConfirmModal({
      header: 'Book deletion',
      text: 'Are you sure you want to delete this book?',
      cancelText: 'Keep it',
      confirmText: 'Delete',
    });
  }
}
