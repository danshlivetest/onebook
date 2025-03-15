import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

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
  @Input() icon!: string;
  @Input() color: IconColor = IconColor.PRIMARY;
}
