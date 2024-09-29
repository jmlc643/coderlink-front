import { Postulation } from "../postulation-api/interfaces"

export interface JobOffer{
    message : string,
    budget : number,
    duration : string,
    publicationDate : Date,
    postulation : Postulation
}

export interface CreateJobOfferRequest{
    message : string,
    budget : number,
    duration : string,
    customerUsername : string,
    postulationId : number
}