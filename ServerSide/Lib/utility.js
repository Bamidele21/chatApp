import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET,
       { expiresIn:"7days"}
    )
 //generates token in form of cookie 
    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days converted to Milliseconds
        httpOnly: true, //prevents XSS attactks 
        sameSite: "lax", //CSRF prevention
        secure: process.env.NODE_ENV!=="developing",
        cookie_domain: "https://chatapp-nanx.onrender.com"
    }); 

    return token;
 
}