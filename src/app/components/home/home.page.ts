import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonComponent, ButtonType } from '@shared/components'

import { BookListComponent } from '../book-list/book-list.component'
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, HeaderComponent, BookListComponent],
  templateUrl: './home.page.html'
})
export default class HomePage {
  readonly ButtonType = ButtonType
}
