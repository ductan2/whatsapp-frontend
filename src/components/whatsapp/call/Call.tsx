/* eslint-disable @typescript-eslint/no-explicit-any */
import CallArea from "./CallArea";
import Header from "./Header";
import RingTone from "./RingTone";
import CallAction from "./CallAction";
import { useState } from "react";
import { CallVideoType } from "../../../types/type.custom";
type Props = {
   call: CallVideoType;
   setCall: React.Dispatch<React.SetStateAction<CallVideoType>>;
   callAccepted: boolean;
   myVideo: any;
   userVideo: any;
   stream: any;
   answerCall: () => void;
   showUiVideo: boolean;
   endCall: () => void;
};
const Call = ({
   call,
   callAccepted,
   setCall,
   myVideo,
   userVideo,
   answerCall,
   stream,
   showUiVideo,
   endCall
}: Props) => {
   const [showAction, setShowAction] = useState(false);
   const [toggle, setToggle] = useState(false);
   console.log("call ",call)
   return (
      <>
         <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${
               call.receivingCall && !callAccepted ? "hidden" : ""
            } }`}
            onMouseOut={() => setShowAction(false)}
            onMouseOver={() => setShowAction(true)}>
            <div>
               <div>
                  <Header />
                  <CallArea name={call.name} />
                  {showAction ? <CallAction endCall={endCall}/> : null}
               </div>
               {callAccepted && !call.callEnded ? (
                  <div>
                     <video
                        ref={userVideo}
                        playsInline
                        muted
                        autoPlay
                        className={` ${!toggle ? "large-video" : "small-video"}`}></video>
                  </div>
               ) : (
                  ""
               )}
               {stream ? (
                  <div>
                     <video
                        ref={myVideo}
                        playsInline
                        muted
                        autoPlay
                        className={`${toggle ? "large-video" : "small-video"} ${
                           showAction ? "move-video-call mb-5" : ""
                        }`}
                        onClick={() => setToggle(!toggle)}></video>
                  </div>
               ) : null}
            </div>
         </div>
         {call.receivingCall && !callAccepted ? (
            <RingTone call={call} setCall={setCall} answerCall={answerCall} endCall={endCall}/>
         ) : null}
         {!callAccepted && showUiVideo ? (
            <audio src="/audio/ringing.mp3" autoPlay loop></audio>
         ) : null}
      </>
   );
};

export default Call;
