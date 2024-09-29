import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable } from 'rxjs';
import { CreateProjectRequest, Project, SearchProjectRequest } from './interfaces';
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

  getProject(id: number){
    return lastValueFrom(this.httpClient.get<Project>(environment.urlBack+"/project/get-project/"+id))
  }

  deleteProject(id: number): void{
    lastValueFrom(this.httpClient.delete<Project[]>(environment.urlBack + '/project/delete/'+id))
  }

  searchProject(projectName: SearchProjectRequest){
    return lastValueFrom(this.httpClient.post<Project[]>(environment.urlBack + '/project/search/', projectName))
  }
}
