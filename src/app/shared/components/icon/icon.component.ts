import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ICON } from '@shared/consts'

export enum IconColor {
  PRIMARY = 'primary',
  WARN = 'warn'
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  standalone: true,
  imports: [MatIconModule]
})
export class IconComponent {
  @Input() icon!: ICON;
  @Input() color: IconColor = IconColor.PRIMARY;
}
