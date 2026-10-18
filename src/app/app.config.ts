import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ContactApiRepository } from './adapters/outbound/persistence/contact-api.repository';
import { ContactRepositoryPort } from './ports/outbound/contact-repository.port';
import { SaveContactUseCase } from './core/use-cases/save-contact.use-case';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
	provideHttpClient(),
	{
      provide: ContactRepositoryPort,
      useClass: ContactApiRepository
    },
	{
		provide: SaveContactUseCase,
		useFactory: (userRepo: ContactRepositoryPort) => new SaveContactUseCase(userRepo),
		deps: [ContactRepositoryPort]
	}
  ]
};
