import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

import { ButtonComponent } from '../button/button.component'
import { Action, PopoverActionItemComponent } from './popover-action-item/popover-action-item.component'

@Component({
  selector: 'app-popover-actions',
  templateUrl: './popover-actions.component.html',
  standalone: true,
  imports: [MatMenuModule, PopoverActionItemComponent]
})
export class PopoverActionsComponent {
  @Input() actions: Action[] = [];
  @Input() entity!: any;
}
