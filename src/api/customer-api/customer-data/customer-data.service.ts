import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateCustomerRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  private customerSource = new BehaviorSubject<CreateCustomerRequest | null>(null);
  currentCustomer = this.customerSource.asObservable();

  updateCustomer(customer: CreateCustomerRequest) {
    this.customerSource.next(customer);
  }
}
