import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { CreateCustomerRequest, Customer } from '../customer-api/interfaces';
import { environment } from '../../environments/environment.development';
import { CreateDeveloperRequest } from '../developer-api/interfaces';
import { AuthenticationUserRequest, ChangePasswordRequest, GetAuthorites, GetUserResponse, RecoveryPasswordRequest } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  currentUserData : BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  httpClient = inject(HttpClient);

  constructor() {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem("token") : null;
    this.currentUserLoginOn = new BehaviorSubject<boolean>(token != null);
    this.currentUserData = new BehaviorSubject<string>(token || "");
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
    return this.httpClient.post<any>(environment.urlBack+'/auth/register/customer/', customer)
  }

  registerDeveloper(developer: CreateDeveloperRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack+'/auth/register/developer/', developer)
  }

  login(user: AuthenticationUserRequest): Observable<any> {
    return this.httpClient.post<any>(environment.urlBack + '/auth/login/', user).pipe(
      tap((userData) => {
        console.log("User Data : " + userData);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem("token", userData.token);
        }
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }
  

  logout(){
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  recoveryPassword(recoveryPassword: RecoveryPasswordRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack + '/auth/recovery-password/', recoveryPassword).pipe(
      catchError(this.handleError)
    )
  }

  resetPass(changePassword: ChangePasswordRequest):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack+'/auth/change-password/',changePassword).pipe(
      catchError(this.handleError)
    );
  }

  getUserByToken(token: string){
    return lastValueFrom(this.httpClient.post<GetUserResponse>(environment.urlBack+'/auth/get-user-token/',token))
  }

  getAuthoritiesByToken(token: string){
    return lastValueFrom(this.httpClient.post<GetAuthorites>(environment.urlBack + '/auth/get-authorities-token/', token))
  }
}
