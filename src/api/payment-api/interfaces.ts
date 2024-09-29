import { JobOffer } from "../offer-api/interfaces"

export interface Payment{
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
    paymentMethod: number,
    facturation: string,
    jobOfferId: number
}