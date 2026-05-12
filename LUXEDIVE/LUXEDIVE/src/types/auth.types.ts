export interface SignUpFormData {
    full_name: string
    phone: string
    email: string
    password: string
    confirm_password: string
}

export interface SignInFormData {
    identifier: string // email or phone
    password: string
}

export interface OTPVerificationResponse {
    success: boolean
    message: string
}

export interface UserExistsResponse {
    exists: boolean
    message: string
}
