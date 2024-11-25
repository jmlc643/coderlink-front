import { JobOffer } from "../offer-api/interfaces"

export interface Payment{
    idPayment: number,
    transactionDate : Date,
    total: number,
    totalDate: Date,
    paymentMethod: string,
    facturation: string,
    status: string,
    jobOffer: JobOffer
}

export interface CreatePaymentRequest{
    total: number,
    paymentMethod: string,
    facturation: string,
    jobOfferId: number
}

export interface PaymentOrderRequest{
    paymentId: number,
    returnUrl: string,
    cancelUrl: string
}

export interface PaymentOrderResponse {
    paypalUrl: string
}

export interface PaymentCaptureResponse {
    completed: boolean,
    purchaseId: number
}

export interface CaptureOrderRequest {
    orderId: string
}