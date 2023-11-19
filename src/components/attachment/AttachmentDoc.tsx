import { useRef } from "react"
import { AiTwotoneFileAdd } from "react-icons/ai"
import { useAppDispatch } from "../../store/store"
import { addFiles } from "../../feature/chat/chat.slice"
import toast from "react-hot-toast"
import { getFileType } from "../../utils/getFile"
const allowedTypes = [
   "application/pdf",
   "application/msword",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   "application/vnd.ms-powerpoint",
   "application/vnd.openxmlformats-officedocument.presentationml.presentation",
   "application/vnd.ms-excel",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   "application/vnd.rar",
   "application/zip",
   "text/plain"
];
const AttachmentDoc = ({ setShowAttachment }: { setShowAttachment: React.Dispatch<React.SetStateAction<boolean>> }) => {
   const docRef = useRef<HTMLInputElement>(null)
   const dispatch = useAppDispatch()
   const handleChangeDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
      let files = Array.from(e.target.files || [])
      setShowAttachment(false)
      files.forEach(file => {
         console.log(file.type)
         if (!allowedTypes.includes(file.type)) {
            files = files.filter(f => f.type.includes('application') || f.type.includes('text/plain'))
            toast.error(`${file.name} is not an document`)
            return;
         }
         if (file.size > 1024 * 1024 * 50) {
            files = files.filter(f => f.size <= 1024 * 1024 * 50)
            toast.error(`You can only send 50MB at a time, ${file.name} is larger than 50MB`)
            return;
         }
         console.log()
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = (e) => {
            dispatch(addFiles({ file, dataUrl: e.target?.result as string, type: getFileType(file.type) }))
         }
      })
   }
   return (
      <>
         <div className="rounded-full mt-1 flex items-center justify-center  h-10 w-10 bg-[#5F66CD]" onClick={() => docRef.current?.click()}>
            <AiTwotoneFileAdd className="dark:fill-white" />
         </div>
         <input type="file" hidden ref={docRef} accept="application/*,text/plain" onChange={handleChangeDocument} />
      </>
   )
}

export default AttachmentDoc