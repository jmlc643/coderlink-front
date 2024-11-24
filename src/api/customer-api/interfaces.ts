import { Developer } from "../developer-api/interfaces"
import { JobOffer } from "../offer-api/interfaces"
import { Project } from "../project-api/interfaces"

export interface Customer{
    username: string
    names: string
    lastNames: string
    email: string
    projects: Project[]
    offers: JobOffer[]
    favoritesDevs: Developer[]
}

export interface CreateCustomerRequest{
    username: string
    names: string
    lastName: string
    email: string
    password: string
}

export interface UpdateCustomer{
    username: string
    email: string
    password: string
}