import { ImAttachment } from 'react-icons/im'
import { BiSolidBarChartAlt2 } from 'react-icons/bi'

import { AiFillCamera } from 'react-icons/ai'
import { RefObject, useState } from 'react'
import useClickOutside from '../../hook/useClickOutSide'
import AttachmentPicture from './AttachmentPicture'
import AttachmentDoc from './AttachmentDoc'

const Attachment = () => {
   const [showAttachment, setShowAttachment] = useState(false)
   const domNode: RefObject<HTMLDivElement> = useClickOutside(() => {
      setShowAttachment(false);
   });
   return (
      <div ref={domNode}>
         <div onClick={() => setShowAttachment(!showAttachment)} className="btn text-xl cursor-pointer">
            <ImAttachment className="dark:fill-dark_svg_1" />
         </div>
         {showAttachment && (
            <ul className='absolute bottom-14 text-xl animate-open-emoji'>
               <li className='cursor-pointer'>
                  <AttachmentPicture setShowAttachment={setShowAttachment} />
               </li>
               <li className='cursor-pointer'>
                  <AttachmentDoc setShowAttachment={setShowAttachment} />
               </li>
               <li className='cursor-pointer'>
                  <div className="rounded-full mt-1 flex items-center justify-center  h-10 w-10 bg-[#D3396D]">
                     <BiSolidBarChartAlt2 className="dark:fill-white" />
                  </div>
               </li>
               <li className='cursor-pointer'>
                  <div className="rounded-full mt-1 flex items-center justify-center  h-10 w-10 bg-[#BF5C]">
                     <AiFillCamera className="dark:fill-white" />
                  </div>
               </li>
            </ul>
         )}
      </div>
   )
}

export default Attachment