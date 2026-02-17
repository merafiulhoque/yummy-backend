import { Pool } from "pg";
import { DATABASE_URL, DB_NAME } from "../const/const.js";

const pool = new Pool({
    connectionString: DATABASE_URL,
    database: DB_NAME
})

pool.on("connect", () => {
    console.log("DB connected successfully...");
})

pool.on("error", (err) => {
    console.log("Error connecting DB...",err)
});

export default pool;
