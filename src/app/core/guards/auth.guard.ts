import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = localStorage.getItem('token');
  if (isAuth) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
