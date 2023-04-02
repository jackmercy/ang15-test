import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'test',
    loadComponent: () => import('./test/test.component').then(mod => mod.TestComponent)
  }
];
