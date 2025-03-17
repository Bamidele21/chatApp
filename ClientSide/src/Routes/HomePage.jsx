import { useChatStore } from "../store/useChatStore";
import EmptyChat from "../components/emptyChat";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/sidebar";
function HomePage () {
    const { selectedUsers } = useChatStore();

    return (
        <div className="page-container">
            <div className="sidebar-container">
              <Sidebar/>  
            </div>
        
        {!selectedUsers ? <EmptyChat/> : <ChatContainer/>}
        
        </div>
    )
}

export default HomePage;