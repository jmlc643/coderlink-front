import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Customer, UpdateCustomer } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  httpClient = inject(HttpClient);

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

  sendVerificationCode(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.urlBack}/customer/send-code/`, { email });
  }

  verifyEmailCode(email: string, code: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.urlBack}/customer/verify-code/`, { email, code });
  }

  updateCustomer(updateCustomer: UpdateCustomer, username: string){
    return lastValueFrom(this.httpClient.put<Customer>(`${environment.urlBack}/customer/edit-customer/${username}`, updateCustomer))
  }
}
