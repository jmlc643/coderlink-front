import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer } from '../../api/developer-api/interfaces';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';

@Component({
  selector: 'app-revisar-portafolios-freelancer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revisar-portafolios-freelancer.component.html',
  styleUrl: './revisar-portafolios-freelancer.component.scss'
})
export class RevisarPortafoliosFreelancerComponent implements OnInit{
  router = inject(Router)
  activatedRouter = inject(ActivatedRoute)
  username: string = ""
  developer?: Developer
  developerApiService = inject(DeveloperApiService)

  async ngOnInit() {
    this.activatedRouter.params.subscribe( prm => {
      this.username = this.activatedRouter.snapshot.params['username'];
    })
    await this.loadData()
  }

  private async loadData(){
    this.developer = await this.developerApiService.getDeveloper(this.username)
  }


    openLink(url: string): void {
      window.open(url, '_blank');
    }
    navigateBack() {
      // Cambia '/freelancer' por la ruta que deseas
      this.router.navigate(['/freelancer']);
    }
}