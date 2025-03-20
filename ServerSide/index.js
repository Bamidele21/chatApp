import express from 'express'
import authRoutes from "./auth.route.js"
import messageRoutes from "./message.route.js"
import dotenv from "dotenv"
import connnectDB from "./Lib/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ioServer, app, server } from './Lib/socket.js'
import { Server } from 'socket.io'
import path from 'path'


dotenv.config()

const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json({limit: '50mb'}));

//returns data in storable .json format//
app.use (express.json())
app.use(cookieParser())
app.use(cors({
    AccessControlAllowOrigin: "https://whatsthetea.netlify.app",
    origin:["https://whatsthetea.netlify.app","http://localhost:5173"],
   credentials: true,
   optionsSuccessStatus: 200,
}))

server.listen(PORT, () => {
    console.log('Server is running on PORT:' + PORT)
    connnectDB();
})

// authentication 

app.use ("/api/auth", authRoutes)
app.use ("/api/messages", messageRoutes)