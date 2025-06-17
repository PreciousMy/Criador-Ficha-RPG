import { CanActivateFn } from '@angular/router';

export const guardaGuard: CanActivateFn = (route, state) => {
   const token = localStorage.getItem('token');

  if (token) return true;
  return false;
};