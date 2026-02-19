import { Router } from "express";

//import menu controller
import { addMenus } from "../../controller/menu/addMenu.js";
import { getMenus } from "../../controller/menu/getMenus.js";
import { editMenu } from "../../controller/menu/editMenu.js";
import { deleteMenu } from "../../controller/menu/deleteMenu.js";
// import middlewares
import { isAdminLoggedIn } from "../../middlewares/isAdminLoggedIn.js";
import { isTokenValid } from "../../middlewares/isTokenValid.js";

//initiate menu router
const menuRouter = Router();

//get menus
menuRouter.get("/", isTokenValid,getMenus)
//add menu
menuRouter.post("/add-menus", isAdminLoggedIn,addMenus)
//edit menu
menuRouter.put(`/edit-menu/:id`, isAdminLoggedIn, editMenu)
//deletemenu
menuRouter.delete("delete-menu/:id", isAdminLoggedIn, deleteMenu)

export default menuRouter;