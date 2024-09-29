import { Postulation } from "../postulation-api/interfaces";
import { Skill } from "../skill-api/interfaces";

export interface Project{
    name: string;
    description: string;
    milestones: string;
    presentation: string;
    revision: string;
    status: string;
    category: string;
    qualification: string;
    createdAt: Date;
    skills: Skill[];
    postulations: Postulation[];
}

export interface CreateProjectRequest{
    name: string;
    description: string;
    budget: number
    milestones: string;
    presentation: string;
    revision: string;
    category: string;
    qualification: string;
    username: string;
    skills: Skill[];
}