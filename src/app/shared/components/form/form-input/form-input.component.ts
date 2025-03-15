import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs'

import { SubsriptionsService } from '@shared/services'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [SubsriptionsService]
})
export class FormInputComponent implements OnInit {
  @Input() label!: string;
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder = 'Enter text';
  @Input() control: FormControl = new FormControl();

  errorMessage = signal('');

  constructor(private subsriptions: SubsriptionsService) {}

  ngOnInit(): void {
    this.subscribeOnControlChanges();
  }

  private subscribeOnControlChanges(): void {
    this.subsriptions.add(
      merge(this.control.statusChanges, this.control.valueChanges)
      .subscribe(this.checkErrors.bind(this))
    );
  }

  private checkErrors(): void {
    if (this.control.hasError('required')) {
      this.errorMessage.set(`You must enter the ${this.label}`);
    } else {
      this.errorMessage.set('');
    }
  }
}
