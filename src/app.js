import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import whiteList from "./utils/whiteList.js";
import routes from "./routes/index.js"

config()

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        if(whiteList.includes(origin)){
            
            
            return callback(null, origin)
        }
        return callback("Error CORS: Dominio " + origin + " no permitido")
    },
    optionsSuccessStatus: 200,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use("/api/auth", routes.AuthRouter)
app.use("/api/notes", routes.NotesRouter)
app.use("/api/users", routes.UserRouter)
app.use("/api/tags", routes.TagsRouter)
app.use("/api/notifications", routes.NotificationRouter)

export default app;


