import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { ButtonComponent, ButtonType, FormInputComponent , ModalHeaderComponent } from '@shared/components'
import { Book, BookForm } from '@types';

export interface EditBookModalData {
  header: string;
  book?: Book;
}

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
    ModalHeaderComponent,
    FormInputComponent
]
})
export class EditBookModalComponent implements OnInit, EditBookModalData {
  readonly ButtonType = ButtonType;

  header!: string;
  book: Book | undefined;

  bookForm!: BookForm;

  get title(): FormControl<string> {
    return this.bookForm.controls.title;
  }

  get author(): FormControl<string> {
    return this.bookForm.controls.author;
  }

  get year(): FormControl<number> {
    return this.bookForm.controls.year;
  }

  constructor(
    private dialogRef: MatDialogRef<EditBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditBookModalData
  ) { }

  ngOnInit(): void {
    this.setData();
    this.initForm();
  }

  close(data?: Book): void {
    this.dialogRef.close(data);
  }

  save(): void {
    console.log('LOG: save', this.bookForm.value);
  }

  private setData(): void {
    this.header = this.data.header;
    this.book = this.data.book;
  }

  private initForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(this.book?.title || '', [Validators.required]),
      author: new FormControl(this.book?.author || '', [Validators.required]),
      year: new FormControl((this.book?.year || new Date().getFullYear()) as number, [Validators.required]),
      description: new FormControl(this.book?.description || ''),
    }) as BookForm;
  }
}
