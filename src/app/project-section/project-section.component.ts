import { Component, inject, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Project, SearchProjectRequest } from '../../api/project-api/interfaces';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.scss'
})
export class ProjectSectionComponent implements OnInit{
  projectApiService = inject(ProjectApiService)
  projectName: string = ''
  searchRequest: SearchProjectRequest = {
    projectName : ''
  }
  
  ngOnInit(): void {
    this.loadData()
  }
  projects: Project[] = []

  private async loadData(){
    this.projects = await this.projectApiService.getProjects()
  }

  async search(){
    this.searchRequest.projectName = this.projectName
    this.projects = await this.projectApiService.searchProject(this.searchRequest)
    console.log(this.projects)
  }
}
