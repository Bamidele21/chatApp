import { useChatStore } from "../store/useChatStore"
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import LoadingChat from "./loadingChat";
import { useAuthStore } from "../store/useAuthstore";
LoadingChat
function ChatContainer () {
    const {messages, getMessages, isMessagesLoading, selectedUsers, listenToMessages, unlistenToMessages} = useChatStore()
    const {authUser}= useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUsers._id);
        listenToMessages();
        return () => {
            unlistenToMessages();
        }
    }, [selectedUsers._id, getMessages, listenToMessages, unlistenToMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    },[messages]);
    
    
    if (isMessagesLoading) return <LoadingChat/>


    return (
        <>
        <div className="chat-container">
        <ChatHeader/>
        
        <div className="chat-content">
            {messages.map((message)=> (
                <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id? "chat-end":"chat-start"}`}
                ref={messageEndRef}>
                    <img className="chat-img-avatar" 
                    src={message.senderId===authUser._id? authUser.profilePic || "../assets/Profile_avatar_placeholder_large.png" : selectedUsers.profilePic || "../assets/Profile_avatar_placeholder_large.png"} 
                    alt="profile pic"/>
                    <div className="chat-bubble">
                        <time>{message.createdAt}</time>
                        {message.image && (
                            <img
                             height= "200px"
                             width= "200px"
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