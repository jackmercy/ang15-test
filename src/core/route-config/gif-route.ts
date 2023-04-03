import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../../main/gif-section/base/base.component').then(c => c.BaseComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../../main/gif-section/trending/trending.component').then(c => c.TrendingComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('../../main/gif-section/search-result/search-result.component').then(c => c.SearchResultComponent)
      }
    ]
  }
] as Route[];