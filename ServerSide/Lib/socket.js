import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

const ioServer = new Server( server, {
    cors: {
        origin: ["http://localhost:5173"],
       
    },
});

export function getReceiverSocketId(userId ) {

    return userSocketMap[userId]

}
//stores the online users 
const userSocketMap = {}// userId:socketId

ioServer.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;

    ioServer.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        delete userSocketMap[userId];
        ioServer.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export {ioServer, app, server}