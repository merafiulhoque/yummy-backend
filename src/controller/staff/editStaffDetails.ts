import { Request, Response } from "express";
import { staffSchema } from "../../validators/schemas.js";
import pool from "../../config/db.js";
import _ from "lodash";

export async function editStaffDetails(req: Request, res: Response){
    try {
        const {id} = req.params
        const result = staffSchema.safeParse(req.body)

        if(!result.success){
            return res.status(403).json({
                success: false,
                message: result.error.flatten().fieldErrors
            })
        }

        const {name, email} = result.data
        const query1 = "SELECT name, email FROM staff WHERE email= $1"
        const queryRes1 = await pool.query(query1,[email])

        if(_.isEqual(result.data, queryRes1.rows[0])){
            return res.status(403).json({
                success: false,
                message: "No changes found"
            })
        }

        const query2 = ""
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}