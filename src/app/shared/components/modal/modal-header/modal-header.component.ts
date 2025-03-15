import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Output } from '@angular/core';

import { ButtonComponent } from '@shared/components'

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class ModalHeaderComponent {
  @Output() whenClose = new EventEmitter();
}
