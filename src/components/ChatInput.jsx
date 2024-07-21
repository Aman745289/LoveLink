import { useState } from "react"

const ChatInput = () => {
    const [textArea, setTextArea] = useState(null)


    return (
        <div className="chat-input">
            <textarea className="text" value={textArea} onChange={(e)=>setTextArea(e.target.value)} />
            <button className="secondary-btn">Send</button>
        </div>
    )

}


export default ChatInput