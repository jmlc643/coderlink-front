import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { Customer } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<string> = new BehaviorSubject<string>("");

  httpClient = inject(HttpClient);

  constructor() {}

  listCustomers(){
    return lastValueFrom(this.httpClient.get<Customer[]>(environment.urlBack+'/customer/list/'))
  }

  getCustomer(username: string){
    return lastValueFrom(this.httpClient.get<Customer>(environment.urlBack+'/customer/get-customer/'+username))
  }

  addFavorite(username: string, developer: string){
    return lastValueFrom(this.httpClient.get<Customer>(environment.urlBack+`/customer/add-favorite/${username}/${developer}`))
  }

  removeFavorite(username: string, developer: string){
    return lastValueFrom(this.httpClient.delete<Customer>(environment.urlBack+`/customer/delete-favorite/${username}/${developer}`))
  }
}
