import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { IconColor, IconComponent } from '../icon/icon.component'
import { ICON } from '@shared/consts'

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  standalone: true,
  imports: [MatButtonModule, IconComponent]
})
export class IconButtonComponent {
  @Input() icon!: ICON;
  @Input() color: IconColor = IconColor.PRIMARY;
  @Output() whenClicked = new EventEmitter();
}
