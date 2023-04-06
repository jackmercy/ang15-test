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
      },
      {
        path: 'favorite',
        loadComponent: () => import('../../main/gif-section/favorite/favorite.component').then(c => c.FavoriteComponent)
      }
    ]
  }
] as Route[];