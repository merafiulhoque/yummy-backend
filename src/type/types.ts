import { JwtPayload } from "jsonwebtoken"

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

export interface JWT_PAYLOAD extends JwtPayload{
    email: string,
    name: string,
    id: string
}
