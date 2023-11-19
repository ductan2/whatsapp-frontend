import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import ChatItem from "./ChatItem"
import { useEffect, useRef } from "react"
import { BeatLoader } from "react-spinners"

import ChatUploadFile from "./ChatUploadFile"

const ChatMessages = ({ isTyping }: { isTyping: boolean }) => {
   const scrollEndRef = useRef<HTMLDivElement>(null)
   const { messages, files } = useSelector((state: RootState) => state.chat)

   const { user } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      scrollEndRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages])

   return (
      <>
         <div className="mb-[50px] bg-[url(https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png)] bg-cover bg-no-repeat">
            <div className=" scrollbar  overflow_scrollbar overflow-auto  px-[6%]">
               <div className={`${files.length > 0 ? "mb-[200px]" : ""}`}>
                  {messages.map((message) => (
                     <ChatItem key={message._id} message={message} isSender={user._id === message.sender._id} />
                  ))}
               </div>
               <h1 className="text-green-500">{isTyping ? <>
                  <span className="dark:fill-gray-400"><BeatLoader color="gray" /></span></> : ""}</h1>
               <ChatUploadFile files={files} />
               <div ref={scrollEndRef}></div>
            </div>
         </div >
      </>
   )
}

export default ChatMessages