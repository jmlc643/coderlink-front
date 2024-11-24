import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  const userRole = authService.getUserRole();

  // Verifica si el usuario está autenticado
  if (userRole === '[ROLE_DEVELOPER]') {
    router.navigate(['/profile-freelancer']);
    return false;
  }

  // Permite el acceso a la ruta si el usuario no está autenticado
  return true;
};
