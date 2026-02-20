import { Request, Response } from "express";
import { staffSchema } from "../../validators/schemas.js";
import pool from "../../config/db.js";
import { bcryptHash } from "../../utils/bcryptHash.js";
import { ApiResponse } from "../../type/types.js";

export async function addStaff(req: Request, res: Response) {
    try {
        const result = staffSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error.flatten().fieldErrors
            })
        }

        const { name, email, password } = result.data

        const query1 = "SELECT 1 FROM staff WHERE email=$1"
        const queryRes1 = await pool.query(query1, [email])

        if (queryRes1.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Staff with this email already exists"
            })
        }

        const hashedPassword = await bcryptHash(password)
        const query2 = "INSERT INTO staff (name, email, password) VALUES ($1, $2, $3) RETURNING *"
        const queryRes2 = await pool.query(query2, [name, email, hashedPassword])

        const { password: _, ...safeData } = queryRes2.rows[0]

        const response: ApiResponse = {
            success: true,
            message: "Staff added successfully...",
            data: safeData
        }

        return res.status(201).json(response)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong..."
        })
    }
}