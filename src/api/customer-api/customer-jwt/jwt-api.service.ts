import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerApiService } from '../customer-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtApiService implements HttpInterceptor{

  customerApiService = inject(CustomerApiService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: String = this.customerApiService.userToken;

    if (token !== "") {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
    }

    return next.handle(req);
  }
}
