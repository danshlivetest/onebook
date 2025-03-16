import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { ButtonType, FormInputComponent , FormTextareaComponent, ModalFooterComponent, ModalHeaderComponent } from '@shared/components'
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
    ModalHeaderComponent,
    ModalFooterComponent,
    FormInputComponent,
    FormTextareaComponent
  ]
})
export class EditBookModalComponent implements OnInit, EditBookModalData {
  readonly ButtonType = ButtonType;

  header!: string;
  book: Book | undefined;

  bookForm!: BookForm;

  get title(): FormControl<string> {
    return this.bookForm.controls.title as FormControl<string>;
  }

  get author(): FormControl<string> {
    return this.bookForm.controls.author as FormControl<string>;
  }

  get year(): FormControl<number> {
    return this.bookForm.controls.year as FormControl<number>;
  }

  get description(): FormControl<string> {
    return this.bookForm.controls.description as FormControl<string>;
  }

  constructor(
    private dialogRef: MatDialogRef<EditBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditBookModalData
  ) { }

  ngOnInit(): void {
    this.setData();
    this.initForm();
  }

  close(data?: Partial<Book>): void {
    this.dialogRef.close(data);
  }

  save(): void {
    if (this.bookForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.close(this.bookForm.value);
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

  private markAllAsTouched(): void {
    Object.values(this.bookForm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }
}
