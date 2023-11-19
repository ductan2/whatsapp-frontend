import { useRef } from "react"
import { MdOutlineInsertPhoto } from "react-icons/md"
import {  useAppDispatch } from "../../store/store"
import { addFiles } from "../../feature/chat/chat.slice"

import toast from "react-hot-toast"
import { getFileType } from "../../utils/getFile"

const AttachmentPicture = ({ setShowAttachment }: { setShowAttachment: React.Dispatch<React.SetStateAction<boolean>> }) => {
   const pictureRef = useRef<HTMLInputElement>(null)
   const dispatch = useAppDispatch();
   const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowAttachment(false)
      let files = Array.from(e.target.files || [])
      
      files.forEach(file => {
         if (!file.type.includes('image') && !file.type.includes('video')) {
            files = files.filter(f => f.type.includes('image'))
            toast.error(`${file.name} is not an image`)
            return;
         }
         if (file.size > 1024 * 1024 * 5) {
            files = files.filter(f => f.size <= 1024 * 1024 * 5) //5242880 = 5MB = 1024 * 1024 * 5
            toast.error(`You can only send 5MB at a time, ${file.name} is larger than 5MB`)
            return;
         }
         console.log(file.type)
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = (e) => {
            dispatch(addFiles({ file, dataUrl: e.target?.result as string, type: getFileType(file.type) }))
         }
      })

   }

   return (
      <>
         <div className="rounded-full flex items-center justify-center  h-10 w-10 bg-[#0EABF4]"
            onClick={() => { pictureRef.current?.click() }}>
            <MdOutlineInsertPhoto className="dark:fill-white" />
         </div>
         <input type="file" onChange={handleChangeImage}
            hidden ref={pictureRef} multiple accept='image/png,image/jpeg/image/gif/image/webp' />
      </>

   )
}

export default AttachmentPicture