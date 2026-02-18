import { Router } from "express";
import { login } from "../../controller/login.js";

const loginRouter = Router()

loginRouter.post("/", login)

export default loginRouter;