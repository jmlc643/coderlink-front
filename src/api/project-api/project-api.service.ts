import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable } from 'rxjs';
import { CreateProjectRequest, Project } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  httpClient = inject(HttpClient)

  getProjects(){
    return lastValueFrom(this.httpClient.get<Project[]>(environment.urlBack + '/project/list/'))
  }

  createProject(project: CreateProjectRequest):Observable<Project>{
    return this.httpClient.post<Project>(environment.urlBack + '/project/create/',project)
  }
}
