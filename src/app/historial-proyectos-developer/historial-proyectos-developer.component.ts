import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, SetStatus } from '../../api/project-api/interfaces';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { Developer } from '../../api/developer-api/interfaces';
import { Postulation } from '../../api/postulation-api/interfaces';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../api/storage-service/storage.service';

@Component({
  selector: 'app-historial-proyectos-developer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-proyectos-developer.component.html',
  styleUrl: './historial-proyectos-developer.component.scss',
  providers: [DatePipe]
})
export class HistorialProyectosDeveloperComponent implements OnInit {

  projects: Project[] = []
  projectsWithAcceptedPostulations: Project[] = []

  selectedValue = 'TODO';

  setStatus: SetStatus = {
    id: 0,
    status: ""
  }

  storageService = inject(StorageService)


  router = inject(Router)
  developerApiService = inject(DeveloperApiService)
  authApiService = inject(AuthApiService)
  projectApiService = inject(ProjectApiService)
  datePipe = inject(DatePipe);
  developer? : Developer

  async ngOnInit(){
    await this.loadData()
    this.selectedValue = this.storageService.getLastSelectedStatus();
  }

  private async loadData(){
    this.developer = await this.developerApiService.getDeveloper(this.authApiService.getUser()?.username as string)
   // Username del desarrollador actual
    const developerUsername = this.developer.username;

    // Filtra todas las postulaciones aceptadas del desarrollador actual
    const acceptedPostulations = this.developer.postulations.filter(
      (postulation: Postulation) => 
      postulation.status === 'ACEPTED' && postulation.devName === developerUsername
    );

    // Obtén todos los proyectos
    this.projects = await this.projectApiService.getProjects();

    // Filtra los proyectos que tienen postulaciones aceptadas del desarrollador actual
    this.projectsWithAcceptedPostulations = this.projects.filter((project: Project) =>
    project.postulations.some((postulation: Postulation) =>
      acceptedPostulations.some(
        (accepted: Postulation) => 
          accepted.id === postulation.id && accepted.devName === developerUsername
        )
      )
    );
  }

  // Método para eliminar un proyecto
  eliminarProyecto(id: number) {
    this.projectApiService.deleteProject(id).then(() => window.location.reload())
  }
  navigateBack() {
    // Cambia '/freelancer' por la ruta que deseas
    this.router.navigate(['/profile-freelancer']);
  }

  formatDate(dateTime: string): string {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy') || 'Fecha no válida';
  }

  calculateProgress(status: string): number {
    switch (status) {
      case 'TODO':
        return 0;
      case 'PROGRESS':
        return 50;
      case 'COMPLETE':
        return 100;
      default:
        return 0; // En caso de status desconocido
    }
  }

  onStatusChange(event: Event, id: number): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    this.setStatus.id = id
    this.setStatus.status = newStatus
    this.storageService.setLastSelectedStatus(newStatus);
    this.projectApiService.setStatusProject(this.setStatus).then(() => window.location.reload())
  }

}
