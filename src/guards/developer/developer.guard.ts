import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { inject } from '@angular/core';

export const developerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  const userRole = authService.getUserRole();

  // Verifica si el usuario está autenticado
  if (userRole === '[ROLE_CUSTOMER]') {
    router.navigate(['/profile-customer']);
    return false;
  }

  // Permite el acceso a la ruta si el usuario no está autenticado
  return true;
};
