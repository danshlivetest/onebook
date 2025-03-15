import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router'

import { routes } from './app.routes'
import { provideMaterialConfig } from './material.provider'
import { ModalService } from '@shared/services'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideMaterialConfig(),
    ModalService,
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always' }),
    ),
  ],
}
