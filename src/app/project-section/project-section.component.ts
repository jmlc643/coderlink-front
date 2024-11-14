import { Component, inject, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Project, SearchProjectRequest } from '../../api/project-api/interfaces';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { FormsModule } from '@angular/forms';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { GetUserResponse } from '../../api/auth-api/interfaces';
import { PostulationApiService } from '../../api/postulation-api/postulation-api.service';
import { Router } from '@angular/router';
import { CreatePostulationRequests } from '../../api/postulation-api/interfaces';

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
  token = ''
  username : GetUserResponse = {
    username: ''
  }
  projectName: string = ''
  searchRequest: SearchProjectRequest = {
    projectName : ''
  }
  createPostulationRequest: CreatePostulationRequests = {
    devName: '',
    idProject: 0
  }
  
  ngOnInit(): void {
    this.loadData()
  }
  projects: Project[] = []

  private async loadData(){
    this.projects = await this.projectApiService.getProjects()
    this.token = await this.authApiService.userToken
    this.username = await this.authApiService.getUserByToken(this.token)
  }

  async search(){
    this.searchRequest.projectName = this.projectName
    this.projects = await this.projectApiService.searchProject(this.searchRequest)
    console.log(this.projects)
  }

  postulation(id:number){
    this.createPostulationRequest.devName = this.username.username
    this.createPostulationRequest.idProject = id
    this.postulationApiService.createPostulation(this.createPostulationRequest)
    this.router.navigateByUrl('/')
  }
}
