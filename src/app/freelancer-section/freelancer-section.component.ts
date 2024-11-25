import { Component, inject, OnInit } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeveloperApiService } from '../../api/developer-api/developer-api.service';
import { Developer } from '../../api/developer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { CustomerApiService } from '../../api/customer-api/customer-api.service';


@Component({
  selector: 'app-freelancer-sectiont',
  standalone:true,
  imports: [NgFor,NgClass,FormsModule],
  templateUrl: './freelancer-section.component.html',
  styleUrls: ['./freelancer-section.component.scss'] // Asegúrate de que sea 'styleUrls', no 'styleUrl'
})
export class FreelancerSectionComponent implements OnInit{
  
  router = inject(Router);
  freelancerApiService = inject(DeveloperApiService);
  authApiService = inject(AuthApiService)
  customerApiService = inject(CustomerApiService)
  developerApiService = inject(DeveloperApiService)
  freelancers: Developer[] = [];
  favorites: Developer[] = [];

  items = [
    { name: 'Java', selected: false },
    { name: 'C++', selected: false },
    { name: 'C#', selected: false },
    { name: 'Python', selected: false },
    { name: 'HTML', selected: false },
    { name: 'JavaScript', selected: false }
  ];


  async ngOnInit() {
      await this.loadData()
  }

  private async loadData(){
    this.freelancers = await this.freelancerApiService.listDevelopers()
    const username = this.authApiService.getUser()?.username;
    await this.customerApiService.getCustomer(username as string).then(response => {
      this.favorites = response.favoritesDevs; // IDs de los favoritos
  });
  }

  isFavorite(developer: Developer): boolean {
    return this.favorites.some(fav => this.areDevelopersEqual(fav, developer));
  }

  areDevelopersEqual(dev1: Developer, dev2: Developer): boolean {
    return dev1.username === dev2.username; // Usa una propiedad única como `username` para comparar
  }

  toggleFavorite(developer: Developer): void {
    const username = this.authApiService.getUser()?.username;
  
    if (this.isFavorite(developer)) {
      this.customerApiService.removeFavorite(username as string, developer.username).then(() => {
        this.favorites = this.favorites.filter(fav => !this.areDevelopersEqual(fav, developer));
      });
    } else {
      this.customerApiService.addFavorite(username as string, developer.username).then(() => {
        this.favorites.push(developer);
      });
    }
  }

  // Método para manejar el filtrado (ejemplo simple)
  async applyFilters() {
    const selectedItems = this.items
      .filter(item => item.selected)
      .map(item => item.name);
    if(selectedItems.length > 0){
      this.freelancers = await this.developerApiService.filterDeveloperBySkills(selectedItems)
    } else {
      this.freelancers = await this.developerApiService.listDevelopers()
    }
  }

  // Método para ver el perfil del freelancer
  viewProfile(freelancer: Developer) {
    this.router.navigate(['/revisar-portafolios-freelancer/'+freelancer.username]);
  }
}