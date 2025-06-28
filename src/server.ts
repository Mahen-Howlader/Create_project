import express, { Application, Request, Response } from "express"
import cors from "cors"
import { Server } from "http";
import config from "./config";
import mongoose from "mongoose";
import router from "./modules/routers";

let server: Server;
const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(router);



app.get("/", (req, res) => {
    res.send({ success: true, message: "I am here " });
});


async function main() {
    try {
        await mongoose.connect(config.database_url!);

        console.log("Mongodb contected")
        server = app.listen(config.port, () => {
            console.log(`Server is running ${config.port}`)
        })

    } catch (error) {
        console.log(`Server Error ${error}`)
    }
}

main()