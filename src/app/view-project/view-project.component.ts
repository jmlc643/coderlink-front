import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importar Router
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { Project } from '../../api/project-api/interfaces';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit{
  
  project?: Project

  router = inject(Router)
  activatedRouter = inject(ActivatedRoute)
  idd = 0
  projectApiService = inject(ProjectApiService)

  goBack() {
    this.router.navigate(['/profile-customer']); // Cambia '/projects' por la ruta a la que quieras redirigir
  }

  editProject() {
    console.log('Modificando el proyecto:', this.project);
    this.router.navigate(['/modify-project']); // Redirige a la página de modificación
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
  }
}

