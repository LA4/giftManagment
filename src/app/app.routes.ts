import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { GiftList } from './pages/gift-list/gift-list';
import { Auth } from './pages/auth/auth';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'ma-liste', component: GiftList, canActivate: [authGuard] },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' },
];
