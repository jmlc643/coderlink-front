import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router =inject(Router);

  if(authService.isAuthenticated()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }

};
