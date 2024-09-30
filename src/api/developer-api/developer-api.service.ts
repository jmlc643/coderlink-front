import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Developer } from './interfaces';
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
}
