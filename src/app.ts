import express, {type Express, Request, Response} from "express";
import cors from "cors";
import loginRouter from "./routes/auth/loginRoute.js"
import menuRouter from "./routes/menu/menuRouter.js";
import cookieParser from "cookie-parser";
const app: Express = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

// to create admin paste the api endpoint from extra functions
app.use("/login", loginRouter)

//admins protected routes
app.use("/menus", menuRouter)


export default app;