import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AskChangesRequest, Project } from '../../api/project-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-solicitar-cambios',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './solicitar-cambios.component.html',
  styleUrl: './solicitar-cambios.component.scss'
})
export class SolicitarCambiosComponent implements OnInit{

  descripcion = '';
  mensajeConfirmacion = "";

  request: AskChangesRequest = {
    customerName: '',
    devName: '',
    idProject: 0,
    message: ''
  }

  username = ""
  devName = ""
  idd = 0
  project?: Project

  router = inject(Router)
  authApiService = inject(AuthApiService)
  projectApiService = inject(ProjectApiService)
  activatedRouter = inject(ActivatedRoute)

  // Handle form submission

  async ngOnInit() {
    this.activatedRouter.params.subscribe( () => {
      this.idd = +this.activatedRouter.snapshot.params['id'];
    })
    await this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUser()?.username as string
    this.project = await this.projectApiService.getProject(this.idd)
    const filteredPostulations = this.project?.postulations.filter(postulation => postulation.status == 'ACEPTED');
    if (filteredPostulations && filteredPostulations.length > 0) {
      // Asigna el nombre del desarrollador de la primera postulación que cumple la condición a 'devName'
      this.devName = filteredPostulations[0].devName;
    }
  }

  async onSubmit() {
    if (this.descripcion) {
      this.request.customerName = this.username
      this.request.devName = this.devName
      this.request.idProject = this.idd
      this.request.message = this.descripcion
      const response = await this.projectApiService.askChanges(this.request)
      this.mensajeConfirmacion = response.message
    }
  }

  // Handle cancel action
  onCancel(): void {
    if (confirm('¿Estás seguro de que deseas cancelar la solicitud?')) {
      this.descripcion = '';
      this.router.navigate(['/view-project']);
    }
  }
}