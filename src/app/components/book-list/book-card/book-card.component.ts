import { Component, Input } from '@angular/core';

import type { Book } from '@types'
import { Action, IconButtonComponent, PopoverActionsComponent, TooltipComponent } from '@shared/components'
import { ICON } from '@shared/consts'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  standalone: true,
  imports: [TooltipComponent, PopoverActionsComponent, IconButtonComponent]
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() actions: Action[] = [];

  readonly moreIcon = ICON.MORE;

  viewDetails() {
    if (!this.actions.length) return;

    this.actions[0].whenClicked(this.book);
  }
}
