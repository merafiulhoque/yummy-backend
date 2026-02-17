import { Request, Response } from "express";
import { loginFormSchema } from "../validators/schemas.js";
import pool from "../config/db.js";
import { bcryptCompare } from "../utils/bcryptHash.js";

export async function login(req: Request, res: Response){
    try {
        const result = loginFormSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors
            });
        }

        const {email, password} = result.data

        const query = "SELECT password FROM admin WHERE email= $1"
        const response = await pool.query(query, [email])

        const isPassOk = await bcryptCompare(password, response.rows[0].password as string)


        if(!isPassOk){
            return res.status(300).json({
                success: false,
                msg: "Wrong credentials"
            })
        }

        return res.status(200).json({
                success: true,
                msg: "Login successfull"
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Something went wrong"
        })
    }
}