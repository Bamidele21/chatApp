import jwt from  "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt 
        if (!token) {
            return res.status(401).json({ message: "You are Not Authorized - No Token Provided." });
        }

        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoder.id);

        if(!decoder) {
            return res.status(401).json({ message: "You are Not Authorized - Invalid Token." });
        }

        const user = await User.findById(decoder.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User Not Found." });

           
        }
        
        req.user = user

        next()

        
    } catch (error) {

        console.log ("Error in ProtectRoute middleware", error.message)
        return res.status(500).json({ message: "Server Error." });
    }
}