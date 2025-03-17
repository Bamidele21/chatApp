import express from "express"
import { protectRoute } from "./middleware/auth.middleware.js"
import Message from "./models/message.model.js"
import cloudinary from "./Lib/cloudinary.js"
import User from "./models/user.model.js"
import { getReceiverSocketId, ioServer} from "./Lib/socket.js"


const router = express.Router()

//generates the users on the side bar//
router.get("/users", protectRoute, async (req, res) => {
try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    res.status(200).json(filteredUsers)
} catch (error) {
    console.error("Error in getUsersforSidebar: " + error.mesage)
    res.status(500).json({ message: "Server Error" })
    
}
})

//generates messages linked to id//
router.get("/:id", protectRoute, async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId= req.user._id
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId:userToChatId},
            {senderId: userToChatId, receiverId: myId}]
        })

        res.status(200).json(messages)
        
    } catch (error) {
        console.error("Error in getMessages: ", error.mesage)
        res.status(500).json({ message: "Server Error" })
        
    }
})

router.post("/send/:id", protectRoute, async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params
        const senderId =req.user._id

        let imageUrl;
        if(image) {
            //uploads image to cloudinary in base64 format//
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            text,
            senderId,
            receiverId,
            image: imageUrl
        })

        await newMessage.save()

        // socket.io functionality goes here//
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            ioServer.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log ("Error in sendMessage: ", error.mesage)
        res.status(500).json({ message: "Server Error" })
     }
        
    
})
export default router  