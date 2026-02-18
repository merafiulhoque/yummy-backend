import {Router} from "express";
import addMenus from "../../controller/addMenu.js";
import { isAdminLoggedIn } from "../../middlewares/isAdminLoggedIn.js";

const menuRouter = Router();

menuRouter.post("/add-menus", isAdminLoggedIn,addMenus)

export default menuRouter;