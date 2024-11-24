import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../storage-service/storage.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authData = storageService.getAuthData();

  if (authData && authData.token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`),
    });
    return next(authReq);
  }

  return next(req);
};
