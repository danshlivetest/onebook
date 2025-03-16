import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  standalone: true,
  imports: [MatTooltipModule]
})
export class TooltipComponent {
  @Input() message: string = '';
}
