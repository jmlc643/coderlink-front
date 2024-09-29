export interface Postulation{
    id: number,
    devName: string,
    postulationDate: Date,
    status: string
}

export interface CreatePostulationRequests{
    devName: string,
    idProject: number
}