import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Developer, UpdateDeveloper } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeveloperApiService {

  httpClient = inject(HttpClient)

  listDevelopers(){
    return lastValueFrom(this.httpClient.get<Developer[]>(environment.urlBack + '/developer/list/'))
  }

  getDeveloper(username : string){
    return lastValueFrom(this.httpClient.get<Developer>(environment.urlBack + '/developer/get-developer/'+username))
  }

  sendVerificationCode(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.urlBack}/developer/send-code/`, { email });
  }

  verifyEmailCode(email: string, code: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.urlBack}/developer/verify-code/`, { email, code });
  }

  updateCustomer(updateDeveloper: UpdateDeveloper, username: string){
    return lastValueFrom(this.httpClient.put<Developer>(`${environment.urlBack}/developer/edit-developer/${username}`, updateDeveloper))
  }

  filterDeveloperBySkills(skills: string[]){
    return lastValueFrom(this.httpClient.post<Developer[]>(`${environment.urlBack}/developer/filter-developers/`, skills))
  }
}
