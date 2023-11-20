import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CallVideoType } from "../../../types/type.custom";
import { capitalizeName } from "../../../utils/WordUpperCase";

type Props = {
   call: CallVideoType;
   setCall: React.Dispatch<React.SetStateAction<CallVideoType>>;
   answerCall: () => void;
   endCall: () => void;
};
const RingTone = ({ call, setCall, answerCall,endCall }: Props) => {
   // const { callEnded, receivingCall } = call;
   const [timer, setTimer] = useState(0);

   useEffect(() => {
      if (timer < 20) {
         setTimeout(() => {
            setTimer(timer + 1);
         }, 1000);
      } else {
         setCall({ ...call, receivingCall: false });
      }
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timer]);
   return (
      <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 translate-y-1/2 shadow-lg ">
         <div className="p-4 flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-2">
               <img src={call.avatar} alt={"picture called"} className="w-28 h-28 rounded-full" />
               <div>
                  <h1 className="dark:text-white">{capitalizeName(call.name)}</h1>
                  <span className="dark:text-dark_text_2">Whatsapp video ...</span>
               </div>
            </div>
            <ul className="flex items-center gap-x-2">
               <li>
                  <button
                     onClick={() => endCall()}
                     className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                     <IoMdClose className="fill-white text-2xl" />
                  </button>
               </li>
               <li>
                  <button
                     onClick={() => answerCall()}
                     className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500">
                     <FaCheck className="fill-white" />
                  </button>
               </li>
            </ul>
         </div>
         <audio src={"/audio/ringtone.mp3"} autoPlay loop></audio>
      </div>
   );
};

export default RingTone;
