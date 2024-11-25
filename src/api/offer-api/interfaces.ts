import { Postulation } from "../postulation-api/interfaces"

export interface JobOffer{
    id: number
    budget : number,
    publicationDate : Date,
    postulation : Postulation
}

export interface CreateJobOfferRequest{
    budget : number,
    customerUsername : string,
    postulationId : number
}