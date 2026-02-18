import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwtUtils.js";
import pool from "../config/db.js";
import { ApiResponse } from "../type/types.js";

export async function isAdminLoggedIn(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.token
        const decodedData = jwtVerify(token)
        if(!decodedData){
            const response: ApiResponse = {
                success: false,
                message: "Invalid Token, Please Login again..."
            }
            res.clearCookie("authToken");
            return res.status(400).json(response)
        }

        const query = "SELECT name, email from admin WHERE email = $1"
        const queryRes = await pool.query(query, [decodedData.email])
        if(queryRes.rows.length === 0){
            const response: ApiResponse = {
                success: false,
                message: "Invalid Token, Please Login again..."
            }
            res.clearCookie("authToken");
            return res.status(400).json(response)
        }

        next();
        
        
    } catch (error) {
        return false
    }
}