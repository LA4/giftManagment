import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/core/api/auth';

/** Autorise l'accès aux utilisateurs connectés, sinon redirige vers /auth. */
export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticated()) return true;
  return inject(Router).createUrlTree(['/auth']);
};
