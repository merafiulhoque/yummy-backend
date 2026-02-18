import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwtUtils.js";
import pool from "../config/db.js";
import { ApiResponse } from "../type/types.js";

export async function isAdminLoggedIn(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.authToken
        if(!token){
            const response: ApiResponse = {
                success: false,
                message: "No auth token found"
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

        const query = "SELECT name, email from admin WHERE email = $1"
        const queryRes = await pool.query(query, [decodedData.email])
        if(queryRes.rows.length === 0){
            const response: ApiResponse = {
                success: false,
                message: "Invalid Token, Please Login again..."
            }
            res.clearCookie("authToken");
            return res.status(403).json(response)
        }
        req.admin = queryRes.rows[0];
        return next();
        
        
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            message: "Token not valid as Admin"
        }
        return res.status(500).json(response)
    }
}