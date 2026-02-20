import express, {type Express, Request, Response} from "express";
import cors from "cors";
import menuRouter from "./routes/menu/menuRouter.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/authRouter.js";
import staffRouter from "./routes/staff/staffRouter.js";
const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

// to create admin paste the api endpoint from extra functions
app.use("/auth", authRouter)

//admins protected routes

// menu management
app.use("/menus", menuRouter)

// staff management
app.use("/staff", staffRouter)

export default app;