import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../api/project-api/interfaces';
import { ProjectApiService } from '../../api/project-api/project-api.service';

@Component({
  selector: 'app-modify-project',
  standalone: true,
  imports: [],
  templateUrl: './modify-project.component.html',
  styleUrl: './modify-project.component.scss'
})
export class ModifyProjectComponent implements OnInit{

  project?: Project

  activatedRouter = inject(ActivatedRoute)
  idd = 0
  projectApiService = inject(ProjectApiService)
  
  router = inject(Router)

  saveModify() {
    console.log('Modificar:', this.project);
    this.router.navigate(['/view-project']);
  }

  cancelModify() {
    console.log('Cancelando el modificar:', this.project);
    this.router.navigate(['/view-project']);
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRouter.snapshot.params['id'];
    })
    this.loadData()
  }

  private async loadData(){
    this.project = await this.projectApiService.getProject(this.idd)
  }
}