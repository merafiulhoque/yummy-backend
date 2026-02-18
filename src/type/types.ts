
export interface ApiResponse<T = unknown>{
    success: boolean,
    message: string,
    data?: T,
    error?: any
}


export interface JWT_SIGN_INPUT {
    email: string,
    name: string,
    id: string
}
