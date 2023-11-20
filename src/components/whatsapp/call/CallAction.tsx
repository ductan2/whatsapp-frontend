import { AiFillSound } from "react-icons/ai";
import { FaVideo, FaChevronUp, FaPhoneFlip } from "react-icons/fa6";
import { BiSolidVolumeMute } from "react-icons/bi";

const btnIcon = ` w-[45px] h-[45px] rounded-full flex items-center justify-center bg-dark_bg_2 text-xl`;
type Props = {
   endCall: () => void;
};
const CallAction = ({ endCall }: Props) => {
   return (
      <div className="h-22 w-full absolute bottom-0 z-40">
         <div className="relative bg-[#222] px-4 pt-6 pb-12 rounded-xl">
            <button className="absolute top-1 left-1/2 text-2xl">
               <FaChevronUp className="fill-dark_svg_1 " />
            </button>
            <ul className="flex mt-5 items-center justify-between">
               <li>
                  <button className={btnIcon}>
                     <AiFillSound className="fill-white w-6" />
                  </button>
               </li>
               <li>
                  <button className={btnIcon}>
                     <FaVideo className="fill-white" />
                  </button>
               </li>
               <li>
                  <button className={btnIcon}>
                     <BiSolidVolumeMute className="fill-white" />
                  </button>
               </li>
               <li>
                  <button className={`${btnIcon} bg-red-600 `} onClick={()=>endCall()}>
                     <FaPhoneFlip className="fill-white" />
                  </button>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default CallAction;
