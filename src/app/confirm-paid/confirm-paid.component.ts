import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentApiService } from '../../api/payment-api/payment-api.service';
import { CaptureOrderRequest } from '../../api/payment-api/interfaces';

@Component({
  selector: 'app-confirm-paid',
  standalone: true,
  imports: [],
  templateUrl: './confirm-paid.component.html',
  styleUrl: './confirm-paid.component.scss'
})
export class ConfirmPaidComponent implements OnInit {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute) {}
  paymentApiService = inject(PaymentApiService)
  router = inject(Router)

  ngOnInit(): void {
    // Obtener el parámetro "orderId" desde la URL o de algún otro método
    this.route.queryParams.subscribe(params => {
      this.orderId = params['token'] || null;
      console.log('Order ID:', this.orderId);
    });
  }

  onTransfer(): void {
    const orderId: CaptureOrderRequest = {
      orderId: this.orderId as string
    } 
    this.paymentApiService.captureOrder(orderId)
    this.router.navigateByUrl('/profile-customer')
  }
}
