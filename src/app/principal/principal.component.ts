import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone:true,
  imports: [NgIf,FormsModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  constructor(private router: Router) {}


  isLoggedIn: boolean = false;
  userName: string = '';
  userRole: string = '';

  loginAsUser() {
    // Simulamos que el usuario inicia sesión como 'Juan Pérez', rol 'Cliente'
    this.isLoggedIn = true;
    this.userName = 'Juan Pérez';
    this.userRole = 'Cliente';
  }
  navigateToJoinSelection() {
    this.router.navigate(['/join']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToProjectSection() {
    this.router.navigate(['/project-section']);
  }
  navigateToHireDeveloper() {
    this.router.navigate(['/hire-developer']);
  }
}

