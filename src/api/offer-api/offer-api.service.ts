import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CreateJobOfferRequest, JobOffer } from './interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OfferApiService {

  httpClient = inject(HttpClient)

  listOffers(){
    return lastValueFrom(this.httpClient.get<JobOffer[]>(environment.urlBack + '/offer/list/'))
  }

  createOffer(offer: CreateJobOfferRequest){
    return lastValueFrom(this.httpClient.post<JobOffer>(environment.urlBack + '/offer/create/', offer))
  }
}
