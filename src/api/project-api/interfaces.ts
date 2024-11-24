import { Postulation } from "../postulation-api/interfaces";

export interface Project{
    id: number
    name: string;
    description: string;
    presentation: string;
    revision: string;
    status: string;
    category: string;
    qualification: string;
    createdAt: Date;
    budget: number;
    postulations: Postulation[];
}

export interface CreateProjectRequest{
    name: string;
    description: string;
    budget: number
    presentation: string;
    revision: string;
    category: string;
    qualification: string;
    username: string;
}

export interface SearchProjectRequest{
    projectName: string
}