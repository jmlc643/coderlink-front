import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importar Router
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { Project } from '../../api/project-api/interfaces';
import { CommonModule } from '@angular/common';
import { Postulation } from '../../api/postulation-api/interfaces';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit{
  
  project?: Project

  router = inject(Router)
  activatedRouter = inject(ActivatedRoute)
  idd = 0
  projectApiService = inject(ProjectApiService)
  devName = ''
  postulations : Postulation[] = []

  goBack() {
    this.router.navigate(['/profile-customer']); // Cambia '/projects' por la ruta a la que quieras redirigir
  }

  editProject() {
    console.log('Modificando el proyecto:', this.project);
    this.router.navigate(['/modify-project/'+this.idd]); // Redirige a la página de modificación
  }

  deleteProject() {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
    
    if (confirmDelete) {
      this.projectApiService.deleteProject(this.idd)
      // Redirige a la página deseada después de la confirmación
      this.router.navigateByUrl('/profile-customer') // Cambia '/deleted-project' por la ruta que desees
    } else {
      console.log('Eliminación cancelada');
    }
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
    const filteredPostulations = this.project?.postulations.filter(postulation => postulation.status !== 'SENDED');
    if (filteredPostulations && filteredPostulations.length > 0) {
      // Asigna el nombre del desarrollador de la primera postulación que cumple la condición a 'devName'
      this.devName = filteredPostulations[0].devName;
    }
  }

  hireDev(id: number){
    this.router.navigateByUrl('/hire-developer/'+id)
  }
}

