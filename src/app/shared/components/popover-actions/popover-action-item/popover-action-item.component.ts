import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

export interface Action {
  label: string;
  color?: 'red' | 'primary' | 'default';
  whenClicked: (entity: any) => void;
}

@Component({
  selector: 'app-popover-action-item',
  templateUrl: './popover-action-item.component.html',
  standalone: true,
  imports: [MatMenuModule, CommonModule]
})
export class PopoverActionItemComponent {
  @Input() action!: Action;
  @Input() entity!: any;

  get textColor() {
    switch (this.action.color) {
      case 'red':
        return 'text-red-500';
      case 'primary':
        return 'text-primary';
      default:
        return 'text-gray-500';
    }
  }
}
