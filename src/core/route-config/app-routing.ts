import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./gif-route')
  },
  {
    path: 'upload',
    loadComponent: () => import('../../main/upload-gifs/upload-gifs.component').then(c => c.UploadGifsComponent)
  }
];
