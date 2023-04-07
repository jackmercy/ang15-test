import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { AppRoutes } from './core/route-config/app-routing';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(AppRoutes, withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
    }), withRouterConfig({
        onSameUrlNavigation: 'reload'
    })),
    importProvidersFrom(
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    )
]
}).catch(err => console.error(err));