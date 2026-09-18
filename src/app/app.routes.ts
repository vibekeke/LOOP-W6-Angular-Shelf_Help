import { Routes } from '@angular/router';
import { ColorTest } from './components/dev/color-test/color-test';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { BookCatalogue } from './pages/book-catalogue/book-catalogue';
import { ReadingList } from './pages/reading-list/reading-list';
import { BookDetails } from './pages/book-details/book-details';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'book-catalogue', component: BookCatalogue },
  { path: 'reading-list', component: ReadingList },
  { path: 'book-details/:id', component: BookDetails },
  { path: 'color-test', component: ColorTest },
];
