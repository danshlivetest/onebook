import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog'

import { ModalHeaderComponent } from '@shared/components'
import { Book } from '@types'

export interface BookInfoModalComponentData {
  book?: Book;
}

@Component({
  selector: 'app-book-info-modal',
  templateUrl: './book-info-modal.component.html',
  standalone: true,
  imports: [ModalHeaderComponent, MatDialogContent]
})
export class BookInfoModalComponent {

  get book(): Book {
    return (this.data.book || {}) as Book;
  }

  constructor(
    private dialogRef: MatDialogRef<BookInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: BookInfoModalComponentData
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
