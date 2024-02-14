import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/board-page/board-page.component').then(m => m.BoardPageComponent),
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-page/list-page.component').then(m => m.ListPageComponent),
  },
];
