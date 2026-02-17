import app from "./app.js";
import { PORT } from "./const/const.js";

app.listen( PORT, () => {
    console.log(`Server is running at localhost:${PORT}`)
})