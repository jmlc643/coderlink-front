import { Component,inject,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../../../api/auth-api/auth-api.service';
import { AuthResponse } from '../../../api/storage-service/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isPrincipalPage: boolean = false;
  isLoggedIn: boolean = false; // Simula si el usuario está logeado o no
  userRole: string = ''; // Almacena el rol del usuario
  token: string = ""
  username: AuthResponse ={
    username: "",
    message: "",
    token: "",
    status: false,
    role: ""
  }

  authApiService = inject(AuthApiService)

  router = inject(Router)

  async ngOnInit() {
    // Detecta la ruta actual y verifica si es la principal
    this.router.events.subscribe(() => {
      this.isPrincipalPage = this.router.url === '/' || this.router.url === '/principal';
    });
    const user = this.authApiService.getUser(); // Verifica si hay un usuario autenticado

    if (!user) {
      return; // Evita ejecutar el resto del código
    }
    await this.loadData()
    this.isLoggedIn = this.authApiService.isAuthenticated()
  }

  private async loadData(){
    this.username = await this.authApiService.getUser() as AuthResponse
    if(this.authApiService.getUserRole() == "[ROLE_CUSTOMER]"){
      this.userRole = "Cliente" 
    }
    if(this.authApiService.getUserRole() == "[ROLE_DEVELOPER]"){
      this.userRole = "Freelancer"
    }
  }

  logout() {
    this.authApiService.logout()
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Recarga la página para forzar la actualización del header
    });
  }

  navigateToJoinSelection() {
    this.router.navigate(['/join']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    if(this.userRole == "Cliente"){
      this.router.navigate(['/profile-customer']);
    }
    if(this.userRole == "Freelancer"){
      this.router.navigate(['/profile-freelancer']);
    }
  }
}
