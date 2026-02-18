import { Request, Response } from "express";
import { loginFormSchema } from "../validators/schemas.js";
import pool from "../config/db.js";
import { bcryptCompare } from "../utils/bcryptHash.js";
import { ApiResponse } from "../type/types.js";

export async function login(req: Request, res: Response){
    try {
        const role = req.query.role
        console.log(role)
        const result = loginFormSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors
            });
        }

        const {email, password} = result.data

        const query = `SELECT password FROM ${role} WHERE email= $1`
        const queryRes = await pool.query(query, [email])

        const isPassOk = await bcryptCompare(password, queryRes.rows[0].password as string)


        if(!isPassOk){
            const response: ApiResponse = {
                success: false,
                message: "Wrong credentials"
            }
            return res.status(400).json(response)
        }

        const response: ApiResponse = {
            success: true,
            message: "Login Successfull"
        }

        return res.status(200).cookie("a","a").json(response)

    } catch (error) {
        if(error instanceof Error){
            const response: ApiResponse = {
                success: false,
                message: error.message
            }
            return res.status(500).json(response)
        }
    }
}