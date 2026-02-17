import dotenv from "dotenv";
dotenv.config()

export const DATABASE_URL=process.env.DATABASE_URL
export const DB_NAME=process.env.DB_NAME
export const PORT=Number(process.env.SERVER_PORT) || 8000  as const