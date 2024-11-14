import { JobOffer } from "../offer-api/interfaces"
import { Project } from "../project-api/interfaces"

export interface Customer{
    username: string
    names: string
    lastNames: string
    email: string
    projects: Project[]
    offers: JobOffer[]
}

export interface CreateCustomerRequest{
    username: string
    dni: number
    names: string
    lastName: string
    email: string
    password: string
    typeUser: string
}