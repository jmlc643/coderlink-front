import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CaptureOrderRequest, CreatePaymentRequest, Payment, PaymentCaptureResponse, PaymentOrderRequest, PaymentOrderResponse } from './interfaces';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  httpClient = inject(HttpClient)

  createPayment(payment: CreatePaymentRequest){
    return lastValueFrom(this.httpClient.post<Payment>(environment.urlBack + '/payment/create/', payment))
  }

  createOrder(order: PaymentOrderRequest){
    return lastValueFrom(this.httpClient.post<PaymentOrderResponse>(`${environment.urlBack}/payment/create-order`, order))
  }

  captureOrder(orderId: CaptureOrderRequest){
    return lastValueFrom(this.httpClient.post<PaymentCaptureResponse>(`${environment.urlBack}/payment/capture`, orderId))
  }
}
