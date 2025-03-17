import React from 'react';
import "./navbar.css"
import { useAuthStore } from '../store/useAuthstore';
import Tearoom from "../assets/tearoom.svg?react"
import { GoGear } from 'react-icons/go';
import { Link } from 'react-router-dom';

function Navbar() {

    const { logOut, authUser } = useAuthStore();
    return (
        <header className="navbar">
                <div>
                <Link to ="/"><Tearoom height="50px" width="50px" className="nav-logo"/></Link>
                
                </div>

                <div className="options">
                <div>
                    <Link to ="/settings"><GoGear className="gogear"/></Link>
                    
                    
                </div>
                
                {authUser &&  (//checks if user is authenticated before rendering components//
                    <>
                  <Link to ="/profile"> <p>Profile</p></Link> 
                  <button onClick={logOut}>Logout</button>
                    </>

                )}
                 </div>   
                
           
           
        </header>
    );
}

export default Navbar;