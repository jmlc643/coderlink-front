import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';
import { Developer } from '../../api/developer-api/interfaces';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../api/storage-service/interfaces';

@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.scss'
})
export class ProfileFreelancerComponent implements OnInit{

  username: AuthResponse ={
    username: "",
    message: "",
    token: "",
    status: false,
    role: ""
  }
  
  ngOnInit(): void {
    this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUser() as AuthResponse
    this.developer = await this.developerApiService.getDeveloper(this.username.username)
  }

  router = inject(Router)
  authApiService = inject(AuthApiService)
  developerApiService = inject(DeveloperApiService)

  developer? : Developer

  goToHome() {
    this.router.navigate(['/']);
  }
  verproyecto() {
    this.router.navigate(['/developer-historial-proyectos']);
  }
  editarperfil() {
    this.router.navigate(['/edit-profile-freelancer'])
  }
}
