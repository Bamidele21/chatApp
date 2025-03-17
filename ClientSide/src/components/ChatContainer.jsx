import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import LoadingChat from "./loadingChat";
import { useAuthStore } from "../store/useAuthstore";
LoadingChat
function ChatContainer () {
    const {messages, getMessages, isMessagesLoading, selectedUsers, listenToMessages, unlistenToMessages} = useChatStore()
    const {authUser}= useAuthStore()

    useEffect(() => {
        getMessages(selectedUsers._id);
        listenToMessages();
        return () => {
            unlistenToMessages();
        }
    }, [selectedUsers._id, getMessages, listenToMessages, unlistenToMessages]);
    console.log (messages)
    
    if (isMessagesLoading) return <LoadingChat/>


    return (
        <>
        <div className="chat-container">
        <ChatHeader/>
        
        <div className="chat-content">
            {messages.map((message)=> (
                <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id? "chat-end":"chat-start"}`}>
                    <img className="chat-img-avatar" 
                    src={message.senderId===authUser._id? authUser.profilePic || "../../public/Profile_avatar_placeholder_large.png" : selectedUsers.profilePic || "../../public/Profile_avatar_placeholder_large.png"} 
                    alt="profile pic"/>
                    <div className="chat-bubble">
                        <time>{message.createdAt}</time>
                        {message.image && (
                            <img
                            src={message.image}
                            alt= "attachement"
                            />
                        )
                        }
                        {message.text && (
                            <p>{message.text}</p>
                        )}
                    </div>
                </div>
                
                
            ))}
        
        </div>
        <div>
        <MessageInput/>
        </div>
        </div>
        </>
    )
}
export default ChatContainer