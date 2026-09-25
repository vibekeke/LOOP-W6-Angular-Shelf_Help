import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard-guard';
import { guestGuard } from './guards/guest-guard';

import { ColorTest } from './components/dev/color-test/color-test';
import { Landing } from './components/pages/landing/landing';
import { Login } from './components/pages/login/login';
import { BookCatalogue } from './components/pages/book-catalogue/book-catalogue';
import { ReadingList } from './components/pages/reading-list/reading-list';
import { BookDetails } from './components/pages/book-details/book-details';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'color-test', component: ColorTest },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: '',
    canActivate: [authGuard],
    children: [
      { path: 'book-catalogue', component: BookCatalogue },
      { path: 'reading-list', component: ReadingList },
      { path: 'book-details/:id', component: BookDetails },
    ]
  },
  { path: '**', redirectTo: '' },
];
