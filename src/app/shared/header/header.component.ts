import { Component,inject,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { GetAuthorites, GetUserResponse } from '../../../api/auth-api/interfaces';
import { AuthApiService } from '../../../api/auth-api/auth-api.service';

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
  userName: string = ''; // Almacena el nombre del usuario
  userRole: string = ''; // Almacena el rol del usuario
  token: string = ""
  username: GetUserResponse = {
    username : ''
  }

  role: GetAuthorites = {
    authorities: ''
  }

  authApiService = inject(AuthApiService)

  router = inject(Router)

  async ngOnInit() {
    // Detecta la ruta actual y verifica si es la principal
    this.router.events.subscribe(() => {
      this.isPrincipalPage = this.router.url === '/' || this.router.url === '/principal';
    });
    this.token = this.authApiService.userToken
    this.loadData()
    if(this.userName != ''){
      this.isLoggedIn = true
    }
  }

  private async loadData(){
    this.username = await this.authApiService.getUserByToken(this.token)
    this.userName = this.username.username
    this.role = await this.authApiService.getAuthoritiesByToken(this.token)
    this.userRole = this.role.authorities
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.router.navigate(['/login']); // Redirige a login tras cerrar sesión
  }

  navigateToJoinSelection() {
    this.router.navigate(['/join']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
