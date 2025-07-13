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
    res.send({ success: true, message: "I am here Library Management" });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
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