
import { IoNotificationsSharp } from 'react-icons/io5'
import { AiOutlineClose } from "react-icons/ai"
const Notifications = () => {
   return (
      <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-3">
         <div className="w-full flex items-center justify-between ">
            <div className="flex items-center gap-x-4">
               <div className="icon w-10 text-2xl flex items-center justify-center h-10 bg-[#53BDEB] rounded-full">
                  <IoNotificationsSharp />
               </div>
               <div className="flex flex-col">
                  <span className="text-base text-dark_text_1">Get notified of new messages</span>
                  <span className="text-sm text-dark_text_2 mt-2">Turn on desktop Notifications &gt;</span>
               </div>
            </div>
            <div>
               <AiOutlineClose className="dark:fill-dark_svg_2" />
            </div>
         </div>
      </div>
   )
}

export default Notifications