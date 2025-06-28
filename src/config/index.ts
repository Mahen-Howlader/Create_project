import dotenv from "dotenv";
import path from "path";

dotenv.config({path : path.join(process.cwd(), ".env")});
// {path : path.join(process.cwd(), ".env")}


export default {
    note_env: process.env.NOTE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL
}