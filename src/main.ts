import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig);
});
