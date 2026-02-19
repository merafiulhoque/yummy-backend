import { Router } from "express";
import { login } from "../../controller/login.js";
import { logout } from "../../controller/logout.js";
const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/logout", logout)

export default authRouter;