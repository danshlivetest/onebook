import { Component, Input, OnInit, signal } from '@angular/core';

import { FormInputComponent } from '../form'
import { ICON } from '@shared/consts'
import { FormControl } from '@angular/forms'
import { SubsriptionsService } from '@shared/services'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [FormInputComponent],
  providers: [SubsriptionsService]
})
export class SearchComponent implements OnInit {
  @Input() search = signal('');

  readonly searchIcon = ICON.SEARCH;
  readonly searchControl = new FormControl('');

  constructor(private subscriptions: SubsriptionsService) {}

  ngOnInit(): void {
    this.subscribeOnChange();
  }

  private subscribeOnChange(): void {
    this.subscriptions.add(
      this.searchControl.valueChanges
      .subscribe((value) => this.search.set(value || ''))
    );
  }
}
