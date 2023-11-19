import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import ConversationItem from "./ConversationItem"
import { useContext } from "react"
import { UserOnlineContext } from "../../context/UserOnlineContext"
import { getConversationId } from "../../utils/checkUser"
const Conversation = () => {


   const { conversation, active_conversation } = useSelector((state: RootState) => state.chat)
   const { user } = useSelector((state: RootState) => state.user)
   const { userOnline } = useContext(UserOnlineContext)
   if (!conversation) return null
   return (
      <div className="conversation overflow-hidden scrollbar">
         <ul>
            {conversation && conversation
               .filter((c) => c.latestMessage || c._id === active_conversation?._id)
               .map((item, index) => {
                  const isOnline = userOnline.find((u) => u.user_id === getConversationId(user, item.users))
                  return <ConversationItem isOnline={isOnline ? true : false} key={item._id + "" + index} conves={item} />
               })}
         </ul>
      </div>
   )
}

export default Conversation