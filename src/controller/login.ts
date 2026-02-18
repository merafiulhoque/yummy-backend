import { Request, Response } from "express";
import { loginFormSchema } from "../validators/schemas.js";
import pool from "../config/db.js";
import { bcryptCompare } from "../utils/bcryptHash.js";
import { ApiResponse } from "../type/types.js";
import { jwtSign } from "../utils/jwtUtils.js";

export async function login(req: Request, res: Response){
    try {
        const role = req.query.role

        const result = loginFormSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors
            });
        }

        const {email, password} = result.data

        const query = `SELECT id, name, password FROM ${role} WHERE email= $1`
        const queryRes = await pool.query(query, [email])
        const isPassOk = await bcryptCompare(password, queryRes.rows[0].password as string)
        
        if(!isPassOk){
            const response: ApiResponse = {
                success: false,
                message: "Wrong credentials"
            }
            return res.status(400).json(response)
        }

        const token = jwtSign({email, name: queryRes.rows[0].name as string, id: queryRes.rows[0].id as string})

        const response: ApiResponse = {
            success: true,
            message: "Login Successfull"
        }

        return res.status(200).cookie("authToken", token, {httpOnly: true, secure: true}).json(response)

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