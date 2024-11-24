import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf,NgIf } from '@angular/common';
import { CustomerApiService } from '../../api/customer-api/customer-api.service';
import { Customer } from '../../api/customer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { AuthResponse } from '../../api/storage-service/interfaces';


@Component({
  selector: 'app-profile-customer',
  standalone:true,
  imports: [NgIf,NgForOf],  
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.scss']
})
export class ProfileCustomerComponent implements OnInit{

  customerApiService = inject(CustomerApiService)
  authApiService = inject(AuthApiService)

  customer?:Customer
  token: string = ""
  username: AuthResponse ={
    username: "",
    message: "",
    token: "",
    status: false,
    role: ""
  }

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUser() as AuthResponse
    this.customer = await this.customerApiService.getCustomer(this.username.username)
  }

  goToHome() {
    this.router.navigate(['/']); // Cambia '/home' a la ruta de la página principal en tu proyecto
  }

  goToFavorites() {
    // Redirige a la ruta correcta de favoritos
    this.router.navigate(['/ver-desarrolladores-favoritos']); // Asegúrate de que esta ruta esté bien configurada
  }

  editProfile() {
    // Redirige a la página de edición de perfil
    this.router.navigate(['/edit-profile-customer']);
  }

  createProject() {
    // Redirige a la página de creación de proyectos
    this.router.navigate(['/crear-proyecto']);
  }

  viewProject(id: number) {
    // Lógica para ver el proyecto
    console.log(`Viendo el proyecto con ID: ${id}`);
    this.router.navigate(['/view-project/'+id as string])
  }

  verproyecto() {
    this.router.navigate(['/historial-proyectos']);
  }
}
