import { Request, Response, NextFunction } from "express";
import pool from "../../config/db.js";
import { menuAddSchema } from "../../validators/schemas.js";
import { ApiResponse } from "../../type/types.js";
import _ from "lodash";

export async function editMenu(req: Request, res: Response, next: NextFunction){
    try {
        const { id } = req.params
        const query = "SELECT item_name, item_description, price FROM menu WHERE id = $1"
        let queryRes1 = await pool.query(query, [id])
        
        if( queryRes1.rows.length > 0 ){
            const result = menuAddSchema.safeParse(req.body)
            if(!result.success){
                return res.status(401).json({
                    success: false,
                    message: result.error.flatten().fieldErrors
                })
            }
            const {item_name, item_description, price} = result.data

            
            if(_.isEqual(result.data, {...queryRes1.rows[0], price: parseInt(queryRes1.rows[0].price)})){
                return res.status(403).json({
                    success: false,
                    message: "No changes found"
                })
            }

            // if(JSON.stringify(queryRes1) === JSON.stringify(result.data)){
            //     return res.status(403).json({
            //         success: false,
            //         message: "No changes found"
            //     })
            // }


            const query = "UPDATE menu SET item_name=$1, item_description=$2, price=$3 WHERE id=$4 RETURNING *"
            const queryRes2 = await pool.query(query, [item_name, item_description ?? null, price, id])
            const response: ApiResponse = {
                success: true,
                message: "Menu edited successfuly",
                data: queryRes2.rows[0]
            }
            return res.status(200).json(response)
        }

        return res.status(404).json({
            success: false,
            message: "No menu exists with thid id..."
        })

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}