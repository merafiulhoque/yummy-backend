import { Request, Response } from "express";
import pool from "../../config/db.js";
import { ApiResponse } from "../../type/types.js";


export async function deleteMenu(req: Request, res: Response) {
    try {
        const {id} = req.params
        const query = "DELETE FROM menu WHERE id = $1 RETURNING *"
        const queryRes = await pool.query(query,[id])

        if(queryRes.rows.length === 0 ){
            return res.status(404).json({
                success: false,
                message: "No menu found with that id..."
            })
        }

        const response: ApiResponse = {
            success: true,
            message: "Menu Item deleted successfully",
            data: queryRes.rows[0]
        }
        return res.status(200).json(response)
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}