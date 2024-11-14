import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

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

  constructor(private router: Router) {}

  ngOnInit() {
    // Detecta la ruta actual y verifica si es la principal
    this.router.events.subscribe(() => {
      this.isPrincipalPage = this.router.url === '/' || this.router.url === '/principal';
    });
  }
  simulateLogin(name: string, role: string) {
    this.isLoggedIn = true;
    this.userName = name;
    this.userRole = role;
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
