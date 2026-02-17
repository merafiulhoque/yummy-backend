import express, {type Express, Request, Response} from "express";
import cors from "cors";
import { bcryptHash } from "./utils/bcryptHash.js";
import { adminSchema } from "./validators/schemas.js";
import pool from "./config/db.js";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.post("/create-admin",async (req: Request, res: Response) => {
    if(process.env.NODE_ENV === "developement"){
        try {
            const result = adminSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors
                });
            }
            const {name, email, password} = result.data
            const hashedPassword = await bcryptHash(password)
            const query = "INSERT INTO admin (name, email, password) values($1, $2, $3) RETURNING *"
            const response = await pool.query(query, [name, email, hashedPassword])
            console.log(response)
            return res.status(201).json({success: true, data: response.rows[0]})
        } catch (error) {
            return res.status(400).json({msg: "Error occurred", error})
        }
    }
})

export default app;