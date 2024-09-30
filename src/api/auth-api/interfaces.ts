export interface AuthenticationUserRequest{
    username: string
    password: string
}

export interface AuthUserResponse{
    username: string
    message: string
    token: string
    status: boolean
}

export interface ChangePasswordRequest{
    password: string
    confirmationPassword: string
    token: string
}

export interface ChangePasswordResponse{
    message: string
}

export interface RecoveryPasswordRequest{
    email: string
}

export interface RecoveryPasswordResponse{
    message: string
}

export interface GetUserResponse{
    username: string
}

export interface GetAuthorites{
    authorities: string
}