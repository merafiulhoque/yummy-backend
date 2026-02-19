import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../type/types.js";
import { jwtVerify } from "../utils/jwtUtils.js";

export function isTokenValid(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.authToken
        if(!token){
            const response: ApiResponse = {
                success: false,
                message: "Not authorized. Please login..."
            }
            return res.status(401).json(response)
        }
        const decodedData = jwtVerify(token)

        if(!decodedData){
            const response: ApiResponse = {
                success: false,
                message: "Invalid Token, Please Login again..."
            }
            res.clearCookie("authToken");
            return res.status(401).json(response)
        }
        return next();
        
        
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            message: "Error occured while checking token..."
        }
        return res.status(500).json(response)
    }
}