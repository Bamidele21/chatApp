import express from 'express';
import User from './models/user.model.js'
import cloudinary from './Lib/cloudinary.js';
import  bcrypt from "bcryptjs"
import { generateToken } from './Lib/utility.js';
import { protectRoute } from './middleware/auth.middleware.js';
const router = express.Router();

//sign up route//
router.post ("/signup", async (req, res)=> {
    const {fullName, email, password} = req.body
   try {

    if (!fullName || !email || !password) {
        return res.status(400).json({msg: "Please fill all fields"})
    }
    if (password.length <6) {
        return res.status(400).json({msg: "Password must be at least 6 characters long"})
    }

    const usedEmail = await User.findOne({email})

    if (usedEmail)

        {
            return res.status(400).json({msg: "User already exists"})
        }
        //hashes password with bcrypt.js//
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({msg: "invalid User Data"})
        }

    
    
    
   } catch (error) {
    
   }
})

//login route//
router.post ("/login", async (req, res)=> {
    const {email, password} = req.body
    try {
        const usedEmail = await User.findOne({email})
        if (!usedEmail) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const correctPassword = await bcrypt.compare (password, usedEmail.password)
        if (!correctPassword) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
        generateToken(usedEmail._id, res)

        res.status(200).json({
            _id: usedEmail._id,
            fullName: usedEmail.fullName,
            email: usedEmail.email,
            profilePic: usedEmail.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Server Error"})
    }
})


//logout route//
router.post ("/logout", (req, res)=> {
    //set cookie to expire immediately//
    try
    {res.cookie( "jwt", "", {maxAge:0})
    res.json({message: "Logged Out. See You Again"})}
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Server Error"})
    }
    
})


//updates profile uploads profile pic//
router.put("/update-profile",protectRoute, async (req, res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({message: "Please provide a profile picture"})
        }

        const uploadPic = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadPic.secure_url}, {new: true})

        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log("Error in update profile", error.message);
        res.status(500).json({message: "Server Error"})
        
    }

})

router.get("/check", protectRoute, (req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Check Authorization Error", error.message);
        res.status(500).json({message: "Server Error"})
        
    }
})
export default router