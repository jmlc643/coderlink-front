import { Component, inject, OnInit } from '@angular/core';
import { NgFor} from '@angular/common';
import { CommonModule } from '@angular/common';
import { Project, SearchProjectRequest } from '../../api/project-api/interfaces';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { FormsModule } from '@angular/forms';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { PostulationApiService } from '../../api/postulation-api/postulation-api.service';
import { Router } from '@angular/router';
import { CreatePostulationRequests } from '../../api/postulation-api/interfaces';
import { AuthResponse } from '../../api/storage-service/interfaces';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent implements OnInit{
  projectApiService = inject(ProjectApiService)
  authApiService = inject(AuthApiService)
  postulationApiService = inject(PostulationApiService)
  router = inject(Router)
  username: AuthResponse ={
    username: "",
    message: "",
    token: "",
    status: false,
    role: ""
  }
  projectName = ''
  searchRequest: SearchProjectRequest = {
    projectName : ''
  }
  createPostulationRequest: CreatePostulationRequests = {
    devName: '',
    idProject: 0
  }
  devName = ""
  
  async ngOnInit() {
    await this.loadData()
    await this.filterProjects()
  }
  projects: Project[] = []
  loading = true

  private async loadData(){
    try {
      this.projects = await this.projectApiService.getProjects();
      const user = await this.authApiService.getUser(); // Devuelve AuthResponse | null
      if (user) {
        this.username = user;
      } else {
        console.error('No se encontró un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      this.loading = false;
    }
  }

  private async filterProjects(){
    const filteredProjects = await Promise.all(
      this.projects.map(async (project) => {
        const postulations = project.postulations;
        const hasAcceptedPostulation = postulations.some(postulation => postulation.status === 'ACEPTED');
        return hasAcceptedPostulation ? null : project;
      })
    );
    // Asignar los proyectos filtrados (eliminando los valores null)
    this.projects = filteredProjects.filter(project => project !== null) as Project[];
  }

  async search(){
    this.searchRequest.projectName = this.projectName
    this.projects = await this.projectApiService.searchProject(this.searchRequest)
  }

  postulation(id:number){
    this.createPostulationRequest.devName = this.username.username
    this.createPostulationRequest.idProject = id
    this.postulationApiService.createPostulation(this.createPostulationRequest)
    this.router.navigateByUrl('/')
  }

  postulado(project: Project): boolean{
    if(this.username.role == '[ROLE_DEVELOPER]'){
      this.devName = this.username.username
    }

    const resultado = project.postulations.some(postulation => 
      postulation.devName === this.devName
    )

    console.log(resultado)

    return resultado;
  }
}
