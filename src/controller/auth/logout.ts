import { Request, Response } from "express";
import { ApiResponse } from "../../type/types.js";

export function logout(req: Request, res: Response){
    try {
        res.clearCookie("authToken");
        const response: ApiResponse = {
            success: true,
            message: "Logged out successfully"
        }
        return res.status(200).json(response)
    } catch (error) {
        if(error instanceof Error){
            const response: ApiResponse = {
                success: false,
                message: error.message
            }
            return res.status(500).json(response)
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}