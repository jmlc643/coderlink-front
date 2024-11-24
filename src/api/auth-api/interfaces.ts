export interface AuthenticationUserRequest{
    username: string
    password: string
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