import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importar Router
import { ProjectApiService } from '../../api/project-api/project-api.service';
import { Project } from '../../api/project-api/interfaces';
import { CommonModule } from '@angular/common';
import { Postulation } from '../../api/postulation-api/interfaces';
import { CreateJobOfferRequest } from '../../api/offer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { OfferApiService } from '../../api/offer-api/offer-api.service';
import { PaymentApiService } from '../../api/payment-api/payment-api.service';
import { CreatePaymentRequest, PaymentOrderRequest } from '../../api/payment-api/interfaces';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit{
  
  project?: Project

  router = inject(Router)
  activatedRouter = inject(ActivatedRoute)
  idd = 0
  projectApiService = inject(ProjectApiService)
  devName = ''
  postulations : Postulation[] = []
  createoffer: CreateJobOfferRequest ={
    budget: 0,
    customerUsername: '',
    postulationId: 0
  }
  username = ''
  authApiService = inject(AuthApiService)
  offerApiService = inject(OfferApiService)
  paymentApiService = inject(PaymentApiService)

  goBack() {
    this.router.navigate(['/profile-customer']); // Cambia '/projects' por la ruta a la que quieras redirigir
  }

  editProject() {
    this.router.navigate(['/solicitar-cambios/'+this.idd]);
  }

  deleteProject() {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
    
    if (confirmDelete) {
      this.projectApiService.deleteProject(this.idd)
      // Redirige a la página deseada después de la confirmación
      this.router.navigateByUrl('/profile-customer') // Cambia '/deleted-project' por la ruta que desees
    } else {
      console.log('Eliminación cancelada');
    }
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( () => {
      this.idd = +this.activatedRouter.snapshot.params['id'];
    })
    this.loadData()
  }

  private async loadData(){
    this.username = await this.authApiService.getUser()?.username as string
    this.project = await this.projectApiService.getProject(this.idd)
    const filteredPostulations = this.project?.postulations.filter(postulation => postulation.status == 'ACEPTED');
    if (filteredPostulations && filteredPostulations.length > 0) {
      // Asigna el nombre del desarrollador de la primera postulación que cumple la condición a 'devName'
      this.devName = filteredPostulations[0].devName;
    }
  }

  async hireDev(id: number){
    this.createoffer.postulationId = id
      this.createoffer.budget = this.project?.budget as number
      this.createoffer.customerUsername = this.username
      const jobOffer = await this.offerApiService.createOffer(this.createoffer)
      const payment: CreatePaymentRequest = {
        total: this.createoffer.budget,
        paymentMethod: "Paypal",
        facturation: "Facturation of Paypal",
        jobOfferId: jobOffer.id
      }
      const createdPayment = await this.paymentApiService.createPayment(payment)
      const createOrder: PaymentOrderRequest = {
        paymentId: createdPayment.idPayment,
        returnUrl: `${environment.urlFront}/confirm-paid`,
        cancelUrl: `${environment.urlFront}/`
      }
      const order = await this.paymentApiService.createOrder(createOrder)
      window.location.href = order.paypalUrl;
  }

}

