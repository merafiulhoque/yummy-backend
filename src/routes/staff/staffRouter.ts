import { Router } from "express";
import { isAdminLoggedIn } from "../../middlewares/isAdminLoggedIn.js";
import { addStaff } from "../../controller/staff/addStaff.js";
import { editStaffDetails } from "../../controller/staff/editStaffDetails.js";

const staffRouter = Router();

staffRouter.post("/add-staff", isAdminLoggedIn, addStaff);
staffRouter.put("/edit-staff-details", isAdminLoggedIn, editStaffDetails)


export default staffRouter;