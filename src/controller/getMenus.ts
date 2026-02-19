import { Request, Response } from "express";
import pool from "../config/db.js";
import { ApiResponse } from "../type/types.js";

export async function getMenus(req: Request, res: Response){
    try {
        const query = `SELECT id, item_name, item_description, price FROM menu`
        const queryRes = await pool.query(query)

        if(queryRes.rows.length === 0){
            const response: ApiResponse = {
                success: true,
                message: "No menus found...",
            }
            return res.status(200).json(response)
        }

        const response: ApiResponse = {
            success: true,
            message: "Menus fetched successfully...",
            data: queryRes.rows
        }
        return res.status(200).json(response)

    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: error.message
        }
        return res.status(500).json(response)
    }
}