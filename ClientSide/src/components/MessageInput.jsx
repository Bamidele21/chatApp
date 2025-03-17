import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import "./chat.css"
import { FaImages } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";




function MessageInput() {
    const[text, setText]=useState('')
    const[imgPreview, setImgPreview] = useState(null);
    const fileInputRef = useRef(null)
    const {sendMessage}=useChatStore()

    const HandleImgChange =(e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/"))  {
          toast.error("slecet an image file");
          return;
        }
        const reader= new FileReader();
        reader.onloadend = () => {
          setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);

    }

    const removeImage = () => {
      setImgPreview(null)
      if (fileInputRef.current) fileInputRef.current.value= ""

    }

    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!text.trim() &&!imgPreview) return;

      try {
        await sendMessage({
          text: text.trim(),
          image: imgPreview,
        })
        setText("") //clears the form//
        setImgPreview(null)
        if (!fileInputRef.current) fileInputRef.current.value="";
      }
      catch (error) {
        
        console.error("failed to send message:", error);
        toast.error("Error sending message");
      }

    }
    return (
        <>
      <form onSubmit={handleSendMessage}>

        <div className="submission">
          <div>
            {imgPreview &&
             <img src={imgPreview} alt="preview" height="80px" width="80px"/>}
            {imgPreview && <button onClick={removeImage}><IoMdCloseCircleOutline/></button>}
          </div>


        <input
        type="text"
        placeholder="what's the tea?"
        value={text}
        onChange={(e)=>setText(e.target.value)}/>
        <input
        className="img-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={HandleImgChange}
        />
        <button className="img-button"
        type="button"
        onClick={()=> fileInputRef.current?.click()}> <FaImages/></button>
        <button className="sub-button"
        type="submit"
        disabled={!text.trim() && !imgPreview} >send</button>
        </div>
      </form>
        
        </>
    )
}

export default MessageInput;