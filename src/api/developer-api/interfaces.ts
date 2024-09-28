import { Postulation } from "../postulation-api/interfaces"
import { Skill } from "../skill-api/interfaces"

export interface Developer{
    username: string
    names: string
    lastNames: string
    email: string
    portfolio: string
    hoursWorked: number
    paymentRate: string
    workExperience: string
    yearsExperience: number
    postulations: Postulation[]
    skills: Skill[]
}

export interface CreateDeveloperRequest{
    username: string
    dni: number
    names: string
    lastNames: string
    email: string
    password: string
    typeUser: string
    portfolio: string
    hoursWorked: number
    paymentRate: string
    workExperience: string
    yearsExperience: number
    skills: string[]
}