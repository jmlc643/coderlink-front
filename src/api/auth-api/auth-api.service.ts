import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CreateCustomerRequest, Customer } from '../customer-api/interfaces';
import { environment } from '../../environments/environment.development';
import { CreateDeveloperRequest } from '../developer-api/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  currentUserData : BehaviorSubject<string> = new BehaviorSubject<string>("");

  httpClient = inject(HttpClient);

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error '+error.error);
    }else{
      console.error('Backend retorno el código del estado '+error.message);
      console.log(this.userData);
    }return throwError(() => new Error('Error al iniciar sesión. Revise los datos enviados'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  registerCustomer(customer: CreateCustomerRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack+'/auth/register/customer/', customer)
  }

  registerDeveloper(developer: CreateDeveloperRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack+'/auth/register/developer/', developer)
  }
}
