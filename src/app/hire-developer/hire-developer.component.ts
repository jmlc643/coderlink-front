import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulation } from '../../api/postulation-api/interfaces';
import { PostulationApiService } from '../../api/postulation-api/postulation-api.service';
import { CreateJobOfferRequest } from '../../api/offer-api/interfaces';
import { AuthApiService } from '../../api/auth-api/auth-api.service';
import { GetUserResponse } from '../../api/auth-api/interfaces';
import { OfferApiService } from '../../api/offer-api/offer-api.service';
@Component({
  selector: 'app-hire-developer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './hire-developer.component.html',
  styleUrls: ['./hire-developer.component.scss']
})
export class HireDeveloperComponent implements OnInit {
  idd = 0 
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  activatedRouter = inject(ActivatedRoute)
  postulation?: Postulation
  postulationApiService = inject(PostulationApiService)
  offerApiService = inject(OfferApiService)
  authApiService = inject(AuthApiService)
  createoffer: CreateJobOfferRequest ={
    budget: 0,
    customerUsername: '',
    postulationId: 0
  }
  token = ''
  username: GetUserResponse ={
    username: ''
  }

  hireForm = this.formBuilder.group({
    projectId: ['', [Validators.required]],
    paymentRate: ['', [Validators.required]]
  });

  get projectId(){
    return this.hireForm.get('projectId')
  }

  get paymentRate(){
    return this.hireForm.get('paymentRate')
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( prm => {
      console.log(`El id es: ${prm['id']}`);
      this.idd = +this.activatedRouter.snapshot.params['id'];
    })
    this.loadData()
  }

  private async loadData(){
    this.postulation = await this.postulationApiService.getPostulation(this.idd)
    this.token = this.authApiService.userToken
    this.username = await this.authApiService.getUserByToken(this.token)
  }

  onSubmit(): void {
    if (this.hireForm.valid) {
      this.createoffer.postulationId = this.idd
      this.createoffer.budget = Number(this.hireForm.controls.paymentRate.value) || 0
      this.createoffer.customerUsername = this.username.username
      this.offerApiService.createOffer(this.createoffer)
      this.router.navigateByUrl('profile-customer')
    }
  }
  goBack() {
    this.router.navigate(['/']); // Redirige a la página principal
  }
}
