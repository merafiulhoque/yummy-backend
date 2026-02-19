import { Request, Response } from "express"
import { ApiResponse, Menu } from "../../type/types.js"
import { menuAddSchema } from "../../validators/schemas.js"
import pool from "../../config/db.js"


export async function addMenus(req: Request, res: Response){
    try {
        const result = menuAddSchema.safeParse(req.body)
        if(!result.success){
            return res.status(403).json({
                success: false,
                message: result.error.flatten().fieldErrors
            })
        }

        const {item_name, item_description, price}: Menu = result.data

        let query = `SELECT * FROM menu WHERE item_name= $1 AND price= $2`
        let queryRes = await pool.query(query, [item_name, price])

        if(queryRes.rows.length > 0){
            const response: ApiResponse = {
                success: false,
                message: "Menu already exists"
            }
            return res.status(403).json(response)
        }

        query = `INSERT INTO menu (item_name, item_description, price) VALUES ($1, $2, $3) RETURNING *`
        queryRes = await pool.query(query, [item_name, item_description ?? null, price])

        const response: ApiResponse = {
            success: true,
            message: "Menu added successfully"
        }
        return res.status(201).json(response)

    } catch (error: any) {
        const response: ApiResponse = {
            success: false,
            message: error.message
        }
        return res.status(500).json(response)
    }
}