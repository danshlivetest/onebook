import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

import { IconComponent } from '../icon/icon.component'
import { MatIconModule } from '@angular/material/icon'
import { ICON } from '@shared/consts'

export enum ButtonType {
  TEXT = 'text',
  FLAT = 'flat'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [MatButtonModule, CommonModule, IconComponent, MatIconModule]
})
export class ButtonComponent {
  @Input() type: ButtonType = ButtonType.TEXT
  @Input() prefixIcon!: ICON;
  @Output() whenClicked = new EventEmitter();

  readonly ButtonType = ButtonType
}
