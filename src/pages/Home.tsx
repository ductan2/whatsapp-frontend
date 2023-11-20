/* eslint-disable @typescript-eslint/no-explicit-any */
import "../utils/global";
import { useSelector } from "react-redux";
import SideBar from "../components/sidebar/SideBar";
import { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { RootState, useAppDispatch } from "../store/store";
import WhatsappHome from "../components/whatsapp/WhatsappHome";
import SocketContext from "../context/SocketContext";
import ChatContainer from "../components/whatsapp/chat/ChatContainer";
import { getConversation, updateMessages } from "../feature/chat/chat.slice";
import { CallVideoType, ListUserOnline } from "../types/type.custom";
import { UserOnlineContext } from "../context/UserOnlineContext";
import Call from "../components/whatsapp/call/Call";
import { IUser } from "../types/user.type";
import { getConversationId, getConversationNameAndAvatar } from "../utils/checkUser";
import Peer from "simple-peer";

type Props = {
   socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
};
function Home({ socket }: Props) {
   const { user } = useSelector((state: RootState) => state.user);
   const { active_conversation } = useSelector((state: RootState) => state.chat);
   const dispatch = useAppDispatch();
   const { setUserOnline, setTyping } = useContext(UserOnlineContext);
   const [showUiVideo, setShowUiVideo] = useState(false);
   const [stream, setStream] = useState<MediaStream>();
   const myVideo = useRef();
   const connectionRef = useRef();
   const userVideo = useRef<HTMLVideoElement>(null);

   const [callVideo, setCallVideo] = useState<CallVideoType>({
      socket_id: "",
      receivingCall: false,
      callEnded: false,
      name: "",
      signal: "",
      avatar: "",
   });
   const [callAccepted, setCallAccepted] = useState(false);
   useEffect(() => {
      socket?.emit("join", user._id);

      socket?.on("user-online", (users: ListUserOnline[]) => {
         setUserOnline(users);
      });

      socket?.emit("setup socket", socket.id);
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
   const callUser = () => {
      enableMedia();

      const { avatar, name } = getConversationNameAndAvatar(
         user,
         active_conversation?.users as IUser[]
      );

      setCallVideo({ ...callVideo, callEnded: false, name, avatar });
      const peer = new Peer({
         initiator: true,
         trickle: false,
         stream: stream,
      });
      peer.on("signal", (data) => {
         socket?.emit("call user", {
            userToCall: getConversationId(user, active_conversation?.users as IUser[]),
            signal: data,
            from: callVideo.socket_id,
            name: user.name,
            avatar: avatar,
         });
      });
      peer.on("stream", (currentStream) => {
         if (userVideo.current) {
            (userVideo.current as HTMLVideoElement).srcObject = currentStream;
         }
      });
      socket?.on("call accepted", (signal) => {
         setCallAccepted(true);
         peer.signal(signal);
      });
      (connectionRef.current as any) = peer;
   };
   const enableMedia = () => {
      if (myVideo.current && stream) {
         (myVideo.current as HTMLVideoElement).srcObject = stream;
      }
      setShowUiVideo(true);
   };
   const answerCall = () => {
      enableMedia();
      setCallAccepted(true);
      const peer = new Peer({
         initiator: false,
         trickle: false,
         stream: stream,
      });
      peer.on("signal", (data) => {
         socket?.emit("answer call", { signal: data, to: callVideo.socket_id });
      });
      peer.on("stream", (currentStream) => {
         if (userVideo.current) {
            (userVideo.current as HTMLVideoElement).srcObject = currentStream;
         }
      });
      peer.signal(callVideo.signal);
      socket?.on("call accepted", (signal) => {
         setCallAccepted(true);
         peer.signal(signal);
      });

      (connectionRef.current as any) = peer;
   };
   //end call

   const endCall = () => {
      setShowUiVideo(false);
      setCallVideo({ ...callVideo, callEnded: true, receivingCall: false });
      (myVideo.current! as HTMLVideoElement).srcObject = null;
      socket?.emit("end call", callVideo.socket_id);
      (connectionRef?.current as any).destroy();
   };
   //callvideo
   useEffect(() => {
      const setUpMedia = async () => {
         // navgitor.mediaDevices : access to camera and microphone
         try {
            const currentStream = await navigator.mediaDevices.getUserMedia({
               video: true,
               audio: true,
            });

            setStream(currentStream);
         } catch (error) {
            console.error("Error accessing media devices:", error);
         }
      };
      setUpMedia();
      socket?.on("setup socket", (id) => {
         setCallVideo({ ...callVideo, receivingCall: false, callEnded: false, socket_id: id });
      });
      socket?.on("call user", (data) => {
         setCallVideo({ ...callVideo, receivingCall: true, ...data });
      });
      socket?.on("end call", () => {
         setShowUiVideo(false);
         setCallVideo({ ...callVideo, callEnded: true, receivingCall: false });
         (myVideo.current! as HTMLVideoElement).srcObject = null;
         if (callAccepted) {
            (connectionRef?.current as any).destroy();
         }
      });
   }, [callAccepted, callVideo, socket]);
   return (
      <>
         <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center ">
            <div className="container flex min-h-screen">
               <SideBar />
               {active_conversation && active_conversation._id ? (
                  <ChatContainer callUser={callUser} />
               ) : (
                  <WhatsappHome />
               )}
            </div>
         </div>
         <div
            className={
               (showUiVideo || callVideo.signal !== "") && !callVideo.callEnded ? "" : "hidden"
            }>
            <Call
               endCall={endCall}
               call={callVideo}
               setCall={setCallVideo}
               callAccepted={callAccepted}
               userVideo={userVideo}
               myVideo={myVideo}
               showUiVideo={showUiVideo}
               stream={stream}
               answerCall={answerCall}
            />
         </div>
      </>
   );
}

const HomeWithSocket = (props: Props) => (
   <SocketContext.Consumer>
      {(socket) => <Home {...props} socket={socket} />}
   </SocketContext.Consumer>
);
export default HomeWithSocket;
