import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';
import { Developer } from '../../api/developer-api/interfaces';
import { GetUserResponse } from '../../api/auth-api/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-freelancer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-freelancer.component.html',
  styleUrl: './profile-freelancer.component.scss'
})
export class ProfileFreelancerComponent implements OnInit{
  ngOnInit(): void {
    this.token = this.authApiService.userToken
    this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUserByToken(this.token)
    this.developer = await this.developerApiService.getDeveloper(this.username.username)
    console.log(this.developer)
  }

  token = ''

  username: GetUserResponse = {
    username : ''
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
