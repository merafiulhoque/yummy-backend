import express, {type Express, Request, Response} from "express";
import cors from "cors";
import loginRouter from "./routes/auth/login.js"
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// to create admin paste the api endpoint from extra functions
app.use("/login", loginRouter)


export default app;