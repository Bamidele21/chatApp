import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react";
import LoadingSidebar from "./LoadingSidebar";
import "./sidebar.css"
import { useAuthStore } from "../store/useAuthstore";

function Sidebar () {
    const {getUsers, isUsersLoading, selectedUsers, setSelectedUsers, users} = useChatStore();

    const {onlineUsers} = useAuthStore()

    useEffect(() => {
        getUsers();
    }, [getUsers])
    console.log (users)

    if (isUsersLoading) return <LoadingSidebar />;

    return (
        <div className="sidebar-content">
            {users.map((user)=>(
                <div className="sidebar-item"
                key={user._id}
                onClick={()=>{setSelectedUsers(user)}}>
                    <img className={onlineUsers.includes(user._id)?"profile-img online":"profile-img"}
                    src={user.profilePic || "/Profile_avatar_placeholder_large.png"} height="100" width= "100"
                    alt={user.name}/>
                    <div className="user-info">
                    <p>{user.fullName}</p>
                    {onlineUsers.includes(user._id)? 
                        <span style={{color: "green"}}>online!</span>:"offline"
                    }
                    </div>
                </div>
            ))}
        
        
        </div>
    )
}

export default Sidebar;