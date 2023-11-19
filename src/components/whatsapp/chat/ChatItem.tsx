import { IMessage } from "../../../types/chat.type"
import dayjs from "dayjs"
import ChatFile from "./ChatFile"
type Props = {
   message: IMessage
   isSender: boolean
}
const ChatItem = ({ message, isSender }: Props) => {
   return (
      <div className={`w-full flex mt-2 space-x-3 max-w-xs pb-3 ${isSender ? "ml-auto justify-end" : ""}`}>
         <div>
            <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg 
            ${isSender ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>

               {message.files && message.files.length > 0 ? message.files.map((_, index) => {
                  return <ChatFile key={index} files={message.files} />
               }) : <p className="text-sm float-left pb-4 pr-8 h-full">{message.message}  </p>}
               <span className="absolute right-1 bottom-1 text-xs shadow-inner  text-gray-400 leading-none">
                  {dayjs(message.createdAt).format("HH:mm")}
               </span>
            </div>
         </div>
      </div>
   )
}

export default ChatItem