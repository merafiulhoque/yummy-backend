import { Router } from "express";
import { login } from "../../controller/auth/login.js";
import { logout } from "../../controller/auth/logout.js";
const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/logout", logout)

export default authRouter;