import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class FormTextareaComponent {
  @Input() label!: string;
  @Input() control: FormControl = new FormControl();
  @Input() placeholder = 'Enter text';
  @Input() maxRows = 5;
}
