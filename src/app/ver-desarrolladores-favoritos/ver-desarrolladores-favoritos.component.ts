import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';  // Importa la directiva NgForOf
import { Router } from '@angular/router';  // Importa el Router
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { Customer } from '../../api/customer-api/interfaces';
import { CustomerApiService } from '../../api/customer-api/customer-api.service';
import { Developer } from '../../api/developer-api/interfaces';

@Component({
  selector: 'app-ver-desarrolladores-favoritos',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './ver-desarrolladores-favoritos.component.html',
  styleUrls: ['./ver-desarrolladores-favoritos.component.scss']
})
export class VerDesarrolladoresFavoritosComponent {
  router = inject(Router)
  username = ""
  authApiService = inject(AuthApiService)
  customer?: Customer
  customerApiService = inject(CustomerApiService)

  async ngOnInit() {
    this.username = this.authApiService.getUser()?.username as string
    await this.loadData()
  }

  private async loadData(){
    this.customer = await this.customerApiService.getCustomer(this.username);
  }

  eliminarDeFavoritos(developer: Developer): void {
    this.customerApiService.removeFavorite(this.username as string, developer.username).then(() => {
      window.location.reload()
    });
  }

  // Método para navegar al perfil del cliente
  goToProfileCustomer(): void {
    this.router.navigate(['/profile-customer']);  // Redirige a la ruta 'profile-customer'
  }
}