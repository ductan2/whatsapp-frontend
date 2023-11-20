import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { useEffect, useContext } from "react";
import { getMessages } from "../../../feature/chat/chat.slice";
import ChatAction from "./ChatAction";
import { UserOnlineContext } from "../../../context/UserOnlineContext";
import { getConversationId } from "../../../utils/checkUser";
import { IUser } from "../../../types/user.type";
type Props = {
   callUser: () => void;
};
const ChatContainer = ({ callUser }: Props) => {
   const { active_conversation } = useSelector((state: RootState) => state.chat);
   const dispatch = useAppDispatch();
   const { user } = useSelector((state: RootState) => state.user);
   const { userOnline, typing } = useContext(UserOnlineContext);

   useEffect(() => {
      if (active_conversation?._id) {
         dispatch(getMessages({ conv_id: active_conversation._id, token: user?.token }));
      }
   }, [dispatch, active_conversation?._id, user?.token]);

   return (
      <div
         className="relative w-full h-full dark:bg-dark_bg_4
   border-1 dark:border-dark_border_1 select-none overflow-hidden">
         <div>
            <ChatHeader
               isOnline={
                  userOnline.find(
                     (u) =>
                        u.user_id === getConversationId(user, active_conversation?.users as IUser[])
                  )
                     ? true
                     : false
               }
               callUser={callUser}
               conves={active_conversation}
            />
            <ChatMessages isTyping={active_conversation?._id === typing ? true : false} />
            <ChatAction />
         </div>
      </div>
   );
};

export default ChatContainer;
