import Lottie from "lottie-react"
import teaAnimation from "../assets/teaAnimation.json"
import "./chat.css"
function EmptyChat() {

    return(
        <div className="chat-container">
            <Lottie className="empty-animation"
            animationData={teaAnimation}
            height="300px"
            width="300px"
            
            loop={true}/>
            <h1>Welcome to the Tea Room!</h1>
            <p>Share your thoughts, feelings, and enjoy the warm atmosphere of this cozy tea room.</p>
        </div>
    )
}

export default EmptyChat;