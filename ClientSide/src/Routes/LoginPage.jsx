import { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import Tearoom from "../assets/tearoom.svg?react"
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import {GoGear} from "react-icons/go"
import "./LoginPage.css"
import { Link } from "react-router-dom";



function LoginPage() {
    const [showPassword, setShowPassword] =useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const { login, isLoggingIn} = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }
    return(
        <div className="login-container">
            <h1>It's Tea Time!</h1>
            <Tearoom height="200" width="200" className="tea-logo"/>
            <form onSubmit={handleSubmit}>
                 <label><span>Email:</span></label>
                            <input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                            
                            <label><span>Password:</span></label>
                
                            <input type={showPassword? "text" : "password"} id="password" name="password" placeholder="Enter password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                            <span className="passwordhandle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                            
                            <button type="submit" className="submit-button" disabled={isLoggingIn}>
                                {isLoggingIn? (
                                    <>
                                    Loading..
                                    <GoGear size="16" className="spinning-gear"/>
                                    
                                    </>):
                                    (
                                    "Log into your account"
                                    )}
                            </button>
                        </form>
            <p>Don't have an account? Sign up <Link to ="/signup">Here</Link></p>

        
        </div>
    )
}

export default LoginPage;