import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogActions } from '@angular/material/dialog'

import { ButtonComponent, ButtonType } from '@shared/components'

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  standalone: true,
  imports: [
    MatDialogActions,
    ButtonComponent
  ]
})
export class ModalFooterComponent {
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  @Output() whenCancel = new EventEmitter();
  @Output() whenConfirm = new EventEmitter();

  readonly confirmButtonType = ButtonType.FLAT;
}
