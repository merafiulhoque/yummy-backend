import { Router } from "express";
import { addMenus } from "../../controller/addMenu.js";
import { isAdminLoggedIn } from "../../middlewares/isAdminLoggedIn.js";
import { getMenus } from "../../controller/getMenus.js";
import { isTokenValid } from "../../middlewares/isTokenValid.js";
import { editMenu } from "../../controller/editMenu.js";
const menuRouter = Router();


menuRouter.get("/", isTokenValid,getMenus)
menuRouter.post("/add-menus", isAdminLoggedIn,addMenus)
menuRouter.put(`/edit-menu/:id`, isAdminLoggedIn, editMenu)

export default menuRouter;