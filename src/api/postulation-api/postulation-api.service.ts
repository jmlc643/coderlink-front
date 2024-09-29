import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { CreatePostulationRequests, Postulation } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostulationApiService {

  httpClient = inject(HttpClient)

  listPostulations(){
    return lastValueFrom(this.httpClient.get<Postulation[]>(environment.urlBack + '/postulation/list/'))
  }

  createPostulation(postulation: CreatePostulationRequests){
    return lastValueFrom(this.httpClient.post<Postulation>(environment.urlBack + '/postulation/create/', postulation))
  }

  getPostulation(id: number){
    return lastValueFrom(this.httpClient.get<Postulation>(environment.urlBack + '/postulation/get-postulation/'+id))
  }
}
