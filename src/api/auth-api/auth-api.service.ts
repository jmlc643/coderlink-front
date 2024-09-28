import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CreateCustomerRequest, Customer } from '../customer-api/interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<string> = new BehaviorSubject<string>("");

  httpClient = inject(HttpClient);

  constructor() {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("token")||"");
  }

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

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string{
    return this.currentUserData.value;
  }

  registerCustomer(customer: CreateCustomerRequest):Observable<any>{
    return this.httpClient.post<Customer>(environment.urlBack+'/auth/register/customer/', customer).pipe(
      catchError(this.handleError))
  }
}
