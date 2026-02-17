// app.post("/create-admin",async (req: Request, res: Response) => {
//     if(process.env.NODE_ENV === "developement"){
//         try {
//             const result = adminSchema.safeParse(req.body)
//             if (!result.success) {
//                 return res.status(400).json({
//                     errors: result.error.flatten().fieldErrors
//                 });
//             }
//             const {name, email, password} = result.data
//             const hashedPassword = await bcryptHash(password)
//             const query = "INSERT INTO admin (id, name, email, password) values($1, $2, $3, $4) RETURNING *"
//             const response = await pool.query(query, [1, name, email, hashedPassword])
//             console.log(response)
//             return res.status(201).json({success: true, data: response.rows[0]})
//         } catch (error) {
//             return res.status(400).json({msg: "Error occurred", error})
//         }
//     }
// })