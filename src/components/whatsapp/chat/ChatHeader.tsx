
import { useSelector } from "react-redux"
import { IConversation } from "../../../types/chat.type"
import { capitalizeName } from "../../../utils/WordUpperCase"
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RootState } from "../../../store/store"
import { getConversationAvatar, getConversationName } from "../../../utils/checkUser"


type Props = {
   conves: IConversation | null
   isOnline: boolean
}
const ChatHeader = ({ conves, isOnline }: Props) => {
   const { user } = useSelector((state: RootState) => state.user)

   if (!conves) return null
   return (
      <div className="h-[50px] dark:bg-dark_bg_2 justify-between flex items-center p-4 select-none">

         <div className="flex items-center gap-x-4">
            <button className="btn">
               <img src={getConversationAvatar(user, conves.users)} alt={conves.name} className="w-full h-full rounded-full object-cover" />
            </button>
            <div className="flex flex-col">
               <h1 className="dark:text-white text-md font-semibold">
                  {capitalizeName(getConversationName(user, conves.users))}
               </h1>
               <span className={`${isOnline ? "dark:text-green-500" : "dark:text-dark_svg_2"} text-xs`}>{
                  isOnline ? "Online" : "Offline"
               }</span>
            </div>
         </div>
         <div className="flex items-center gap-x-3 text-xl"  >
            <li>
               <button className="btn">
                  <AiOutlineSearch className="dark:fill-dark_svg_1" />
               </button>
            </li>
            <li>
               <button className="btn">
                  <BsThreeDotsVertical className="dark:fill-dark_svg_1" />
               </button>
            </li>
         </div>

      </div>
   )
}

export default ChatHeader