import { IConversation } from "../../types/chat.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { openConversation } from "../../feature/chat/chat.slice";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client/debug";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import SocketContext from "../../context/SocketContext";
import { capitalizeName } from "../../utils/WordUpperCase";
import { getConversationAvatar, getConversationName } from "../../utils/checkUser";
import { useContext } from "react";
import { UserOnlineContext } from "../../context/UserOnlineContext";
import { BeatLoader } from "react-spinners";
dayjs.extend(relativeTime);
type Props = {
   conves: IConversation;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   socket?: Socket<DefaultEventsMap, DefaultEventsMap> | null | any;
   isOnline: boolean;
};
function ConversationItem({ conves, socket, isOnline }: Props) {
   const dispatch = useAppDispatch();
   const { active_conversation } = useSelector((state: RootState) => state.chat);
   const { user } = useSelector((state: RootState) => state.user);
   const { typing } = useContext(UserOnlineContext);

   const handleActiveConversation = async () => {
      const receiver_user = conves.users.find((u) => u._id !== user._id);
      if (!receiver_user) {
         toast.error("User not found");
         return;
      }
      const { payload } = await dispatch(
         openConversation({
            receiver_id: receiver_user?._id,
            token: user.token,
         })
      );
      socket?.emit("join conversation", payload._id);
   };
   return (
      <li
         onClick={handleActiveConversation}
         className={`list-none h-[72px] pb-5 w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 
      cursor-pointer dark:text-dark_text_1 
      ${active_conversation?._id === conves._id ? "dark:bg-dark_hover_1" : ""}`}>
         <div className="relative w-full flex px-3 items-center justify-between py-[10px]">
            <div className="flex items-center gap-x-3">
               <div className="relative h-[50px] w-[50px] min-w-[50px] mr-2 rounded-full overflow-hidden">
                  <img
                     src={getConversationAvatar(user, conves.users)}
                     alt={conves.name}
                     className="w-full h-full object-cover"
                  />
               </div>
               <div className="w-full flex flex-col">
                  <h1 className="font-bold flex items-center gap-x-2">
                     {capitalizeName(getConversationName(user, conves.users))}
                  </h1>
                  <div>
                     <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                        <p>
                           {typing === active_conversation?._id ? (
                              <BeatLoader color="gray" />
                           ) : (
                              conves.latestMessage?.message
                           )}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-x-4 items-end text-sx">
               <span className="dark:text-dark_text_2">
                  {dayjs(conves.latestMessage?.updatedAt).fromNow(true)}
               </span>
               <span
                  className={`${isOnline ? "dark:text-green-500" : "dark:text-dark_svg_2"
                     } text-xs`}>
                  {isOnline ? "Online" : "Offline"}
               </span>
            </div>
         </div>
         <div className="border-b dark:border-b-dark_bg_5"></div>
      </li>
   );
}
const ConversationWithContext = (props: Props) => (
   <SocketContext.Consumer>
      {(socket) => (socket ? <ConversationItem {...props} socket={socket} /> : null)}
   </SocketContext.Consumer>
);

export default ConversationWithContext;
