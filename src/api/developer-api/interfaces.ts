import { Postulation } from "../postulation-api/interfaces"
import { Skill } from "../skill-api/interfaces"

export interface Developer{
    username: string
    names: string
    lastNames: string
    email: string
    portfolio: string
    paymentRate: number
    workExperience: string
    postulations: Postulation[]
    skills: Skill[]
}

export interface CreateDeveloperRequest{
    username: string
    names: string
    lastName: string
    email: string
    password: string
    typeUser: string
    portfolio: string
    paymentRate: number
    workExperience: string
    skills: string[]
}

export interface UpdateDeveloper{
    username: string
    portfolio: string
    paymentRate: number
    email: string
    password: string
}