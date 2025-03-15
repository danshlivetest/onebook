import { FormControl, FormGroup } from "@angular/forms"

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  description?: string;
}

export type BookForm = FormGroup<{
  title: FormControl<Book['title']>;
  author: FormControl<Book['author']>;
  year: FormControl<Book['year']>;
  description?: FormControl<Book['description']>;
}>;
