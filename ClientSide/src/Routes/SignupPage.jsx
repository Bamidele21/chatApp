import { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import { GoGear } from "react-icons/go";
import Tearoom from "../assets/tearoom.svg?react"
import "./signup.css"
import {Link} from "react-router-dom"
import toast from "react-hot-toast";
function SignupPage() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, SetFormdata] = useState({
        fullName:"",
        email:"",
        password:"",
        
    });

    const {signup, isSigningup} = useAuthStore()

    const validateForm = () => {
        if (!formData.fullName) return toast.error("Please enter a full name");
        if (!formData.email) return toast.error("Please enter a valid email");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("this email is invalid");
        if (!formData.password) return toast.error("Please enter a password");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");


        return true;


    };

    const handleSubmit = (e) => {

        e.preventDefault()

        const success = validateForm()

        if (success===true)  
            signup(formData)


    }
    return (
        <div className="signin-container">
        
        <Tearoom className="tea-logo"/>
        <p>Get started today with your free account</p>
        <form className="signup-form" onSubmit={handleSubmit}>
            <label><span>Full Name:</span></label>
            <input type="text" id="fullName" name="fullName" placeholder="Amy Smith" value={formData.fullName} onChange={(e) => SetFormdata({...formData, fullName: e.target.value})} />
            
            <label><span>Email:</span></label>
            <input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={(e) => SetFormdata({...formData, email: e.target.value})} />
            
            <label><span>Password:</span></label>

            <input type={showPassword? "text" : "password"} id="password" name="password" placeholder="Enter password" value={formData.password} onChange={(e) => SetFormdata({...formData, password: e.target.value})} />
            <span className="passwordhandle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
            
            <button type="submit" className="submit-button" disabled={isSigningup}>
                {isSigningup? (
                    <>
                    <GoGear size="18" className="spinning-gear"/>
                    Loading...
                    </>):
                    (
                    "Create Account"
                    )}
            </button>
        </form>
        <div className="login-redir">
            <p>Already have an account? <Link to ="/login">Login</Link></p>
        </div>
        
        </div>
    )

    
}

export default SignupPage;