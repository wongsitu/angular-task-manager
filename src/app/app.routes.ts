import { Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BoardPageComponent,
  },
  {
    path: 'list',
    component: ListPageComponent,
  },
];
