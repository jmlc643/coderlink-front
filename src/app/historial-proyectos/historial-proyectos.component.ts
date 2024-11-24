import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../api/project-api/interfaces';
import { CustomerApiService } from '../../api/customer-api/customer-api.service';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { Customer } from '../../api/customer-api/interfaces';

@Component({
  selector: 'app-historial-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-proyectos.component.html',
  styleUrl: './historial-proyectos.component.scss',
  providers: [DatePipe],
})
export class HistorialProyectosComponent implements OnInit{
  
  projects: Project[] = []
  
  router = inject(Router)
  customerApiService = inject(CustomerApiService)
  authApiService = inject(AuthApiService)
  projectApiService = inject(ProjectApiService)
  datePipe = inject(DatePipe);
  customer? : Customer

  async ngOnInit(){
    await this.loadData()
  }

  private async loadData(){
    this.customer = await this.customerApiService.getCustomer(this.authApiService.getUser()?.username as string)
    this.projects = this.customer.projects
  }

  // Método para ver detalles del proyecto
  verProyecto(id: number) {
    // Aquí podrías navegar a una página de detalles o abrir un modal con la información del proyecto.
    this.router.navigate(['/view-project/'+id]);
  }

  // Método para eliminar un proyecto
  eliminarProyecto(id: number) {
    this.projectApiService.deleteProject(id).then(() => window.location.reload())
  }

  navigateBack() {
    // Cambia '/freelancer' por la ruta que deseas
    this.router.navigate(['/profile-customer']);
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
}