import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    // Obtiene el rol del usuario
    const userRole = authService.getUserRole();

    // Redirige según el rol del usuario
    if (userRole === '[ROLE_CUSTOMER]') {
      router.navigate(['/profile-customer']); // Redirige a la página de creadores
    } else if (userRole === '[ROLE_FREELANCER]') {
      router.navigate(['/profile-freelancer']); // Redirige a la página de lectores
    }

    // Bloquea el acceso a las rutas de autenticación si el usuario está autenticado
    return false;
  }

  // Permite el acceso a la ruta si el usuario no está autenticado
  return true;
};
