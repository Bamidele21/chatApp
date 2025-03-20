import { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { CiCamera } from "react-icons/ci";
import placeholder from "../../public/Profile_avatar_placeholder_large.png"
import "./ProfilePage.css"



function ProfilePage( ) {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
    const [selectedImg, setselectedImg] =useState(null)

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader= new FileReader()

        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setselectedImg(base64Image)
            await updateProfile({ profilePic: base64Image })
        }


    }

  
    return (
        <>
        <div className="profile-container">
        <h1>Your Profile</h1>
        
        <img className="avatar-image" src={selectedImg || authUser.profilePic || "../assets/Profile_avatar_placeholder_large.png" } alt="profile"/> 
            <label htmlFor="avatar-upload">
                <CiCamera height="8px" width="8px" />
                <input type="file" id="avatar-upload" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile}/>
                <p>{isUpdatingProfile? "uploading....": "upload or change your profile picture"}</p>
            </label>
            <div>
                <h3>Your Name</h3>
                <p>{authUser?.fullName}</p>
            </div>
            <div>
                <h3>Your Email Address</h3>
                <p>{authUser?.email}</p>

            </div>
            <div>
                <h4>Member Since</h4>
                <p>{authUser.createdAt?.split("T")[0]}</p>
            </div>
            <div>
                <h4>Account Status</h4>
                <p>Active</p>
            </div>
            
        
        </div>
        </>
    )
}

export default ProfilePage;