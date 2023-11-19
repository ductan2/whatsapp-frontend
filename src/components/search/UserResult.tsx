import { useSelector } from "react-redux";
import { openConversation } from "../../feature/chat/chat.slice";
import { RootState, useAppDispatch } from "../../store/store";
import { IUser } from "../../types/user.type"
import SocketContext from "../../context/SocketContext";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

type Props = {
   item: IUser
   setSearchResult: React.Dispatch<React.SetStateAction<IUser[]>>
   socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
function UserResult({ item, setSearchResult, socket }: Props) {
   const dispatch = useAppDispatch();
   const { user } = useSelector((state: RootState) => state.user)

   const handleActiveConversation = async () => {
      const { payload } = await dispatch(openConversation({ receiver_id: item?._id, token: user.token }))
      socket?.emit('join conversation', payload._id) 
      setSearchResult([])
   }
   return (
      <li onClick={handleActiveConversation}
         className="list-none h-[72px] pb-5 w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 
      cursor-pointer dark:text-dark_text_1 ">
         <div className="relative w-full flex px-3 items-center justify-between py-[10px]">
            <div className="flex items-center gap-x-3">
               <div className="relative h-[50px] w-[50px] min-w-[50px] mr-2 rounded-full overflow-hidden">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
               </div>
               <div className="w-full flex flex-col">
                  <h1 className="font-bold flex items-center gap-x-2">{item.name}</h1>
               </div>
            </div>
         </div>
         <div className="border-b dark:border-b-dark_bg_5"></div>
      </li>

   )
}
export type PropsContext = Pick<Props, "item" | "setSearchResult">;
const UserResultWithContext = (props: PropsContext) => (
   <SocketContext.Consumer>
      {socket => socket ? <UserResult {...props} socket={socket} /> : null}
   </SocketContext.Consumer>
);

export default UserResultWithContext;
