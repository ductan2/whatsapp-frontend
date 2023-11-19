import { useSelector } from "react-redux";
import SideBar from "../components/sidebar/SideBar";
import { RootState, useAppDispatch } from "../store/store";
import { useContext, useEffect } from "react";
import { getConversation, updateMessages } from "../feature/chat/chat.slice";
import WhatsappHome from "../components/whatsapp/WhatsappHome";
import ChatContainer from "../components/whatsapp/chat/ChatContainer";
import SocketContext from "../context/SocketContext";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { ListUserOnline } from "../types/type.custom";
import { UserOnlineContext } from "../context/UserOnlineContext";
import Call from "../components/whatsapp/call/Call";
type Props = {
   socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
};
function Home({ socket }: Props) {
   const { user } = useSelector((state: RootState) => state.user);
   const { active_conversation } = useSelector((state: RootState) => state.chat);
   const dispatch = useAppDispatch();
   const { setUserOnline, setTyping } = useContext(UserOnlineContext);
   useEffect(() => {
      socket?.emit("join", user._id);

      socket?.on("user-online", (users: ListUserOnline[]) => {
         setUserOnline(users);
      });
   }, [user, socket, setUserOnline]);

   useEffect(() => {
      if (user?.token) {
         dispatch(getConversation(user?.token));
      }
   }, [user.token, dispatch]);
   useEffect(() => {
      socket?.on("receive message", (data) => {
         dispatch(updateMessages(data));
      });
      window.scrollTo(0, 0);
      socket?.on("typing", (conves) => {
         setTyping(conves);
      });
      socket?.on("stop typing", () => {
         setTyping("");
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <>
         <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center ">
            <div className="container flex min-h-screen">
               <SideBar />
               {active_conversation && active_conversation._id ? (
                  <ChatContainer />
               ) : (
                  <WhatsappHome />
               )}
            </div>
         </div>
         <Call />
      </>
   );
}

const HomeWithSocket = (props: Props) => (
   <SocketContext.Consumer>
      {(socket) => <Home {...props} socket={socket} />}
   </SocketContext.Consumer>
);
export default HomeWithSocket;
