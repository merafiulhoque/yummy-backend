import {Router} from "express";
import addMenus from "../../controller/addMenu.js";

const menuRouter = Router();

menuRouter.post("/add-menus",addMenus)

export default menuRouter;