import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthstore"
import { IoMdClose } from "react-icons/io"

function ChatHeader () {
    const{selectedUsers,setSelectedUsers } =useChatStore()
    const { onlineUsers } = useAuthStore()
    

    return (
        <>
        <div className="chat-header">
         <div >
            <img className=" header-img" src={selectedUsers.profilePic || "../assets/Profile_avatar_placeholder_large.png"} alt={selectedUsers.fullName}  />
         </div>
         <div >
            <h4>{selectedUsers.fullName}</h4>
            <span 
            style= {onlineUsers.includes(selectedUsers._id)? {color: "green"}: {color:"azure"}}
           >{onlineUsers.includes(selectedUsers._id)? "online!":"offline"}<IoMdClose onClick={()=>{setSelectedUsers(null)}} className="close"/></span>
            </div>
 
        </div>
        
        </>

    )
}
export default ChatHeader