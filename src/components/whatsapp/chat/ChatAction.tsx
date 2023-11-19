import { useRef, useState, useContext } from "react";
import Attachment from "../../attachment/Attachment";
import EmojiPickerApp from "../../icon/EmojiPicker";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { sendMessage } from "../../../feature/chat/chat.slice";
import { BeatLoader } from "react-spinners";
import SocketContext from "../../../context/SocketContext";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { UserOnlineContext } from "../../../context/UserOnlineContext";
import { uploadFiles } from "../../../utils/uploadFiles";

type Props = {
   socket?: Socket<DefaultEventsMap, DefaultEventsMap> | null;
};

function ChatAction({ socket }: Props) {
   const [message, setMessage] = useState("");
   const [uploadLoading, setUploadLoading] = useState(false);
   const { typing } = useContext(UserOnlineContext);
   const dispatch = useAppDispatch();
   const messageRef = useRef<HTMLInputElement>(null);
   const { user } = useSelector((state: RootState) => state.user);
   const { active_conversation, loading, files } = useSelector((state: RootState) => state.chat);

   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUploadLoading(true);
      const uploaded_files = await uploadFiles(files);
      if (message.trim() === "" && uploadFiles.length < 1) return;
      const { payload } = await dispatch(
         sendMessage({
            conv_id: active_conversation?._id as string,
            message: message,
            token: user?.token,
            files: uploadFiles.length > 0 ? uploaded_files : [],
         })
      );
      setUploadLoading(false);
      socket?.emit("send message", payload);
      setMessage("");
      socket?.emit("stop typing", active_conversation?._id);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!typing) {
         socket?.emit("typing", active_conversation?._id);
      }
      if (e.target.value === "") {
         socket?.emit("stop typing", active_conversation?._id);
      }
      setMessage(e.target.value);
   };
   return (
      <form
         onSubmit={handleSendMessage}
         className="dark:bg-dark_bg_2 px-3 h-[50px] w-full flex items-center absolute bottom-0 py-2 select-none mt-5">
         <div className="w-full flex items-center gap-x-2">
            <ul className="flex gap-x-2">
               <li>
                  <EmojiPickerApp
                     message={message}
                     setMessage={setMessage}
                     messageRef={messageRef}
                  />
               </li>
               <li className="relative">
                  <Attachment />
               </li>
            </ul>
            <input
               value={message}
               ref={messageRef}
               onChange={handleChange}
               type="text"
               className="input dark:bg-dark_hover_1 dark:text-dark_text_1 h-[40px] "
            />

            <button type="submit" className="btn text-2xl">
               {loading || uploadLoading ? (
                  <BeatLoader loading={loading || uploadLoading} className="bg-white" />
               ) : (
                  <IoMdSend className="dark:fill-dark_svg_1" />
               )}
            </button>
         </div>
      </form>
   );
}

const ChatActionWithContext = (props: Props) => (
   <SocketContext.Consumer>
      {(socket) => (socket ? <ChatAction {...props} socket={socket} /> : null)}
   </SocketContext.Consumer>
);

export default ChatActionWithContext;
