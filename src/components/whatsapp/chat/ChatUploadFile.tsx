import { clearFiles, removeFile } from "../../../feature/chat/chat.slice"
import { useAppDispatch } from "../../../store/store"
import { FileType } from "../../../types/type.custom"

type Props = {
   files: FileType[]
}
const ChatUploadFile = ({ files }: Props) => {
   const dispatch = useAppDispatch()
   return (
      <>
         {files.length > 0 && <div className="flex gap-x-2 h-[200px] flex-wrap absolute bottom-0 left-0 right-0 bg-white dark:bg-dark_bg_2 p-2">
            {files.map((file, index) => (
               <div key={index} className="relative ">
                  <span className="text-gray-200 text-bold text-base text-center mb-2 block">{file.type !== "VIDEO" && file.type !== "IMAGE" &&
                     file.file.name.length > 10 ? file.file.name.substring(0, 10) + "..." : ""}</span>
                  {file.type === "IMAGE" ? <img src={file.dataUrl} alt="" className="w-[100px] h-[100px] object-cover" /> :
                     (file.type === "VIDEO" ? <video src={file.dataUrl} className="w-[100px] h-[100px] object-cover" controls /> :
                        <img src={`filesImg/${file.type}.png`} alt="" className="w-[100px] h-[100px] object-cover" />)
                  }
                  <div className="text-center text-red-500 font-bold cursor-pointer"
                     onClick={() => dispatch(removeFile(file))}>X</div>
               </div>
            ))}
            <div className="text-base absolute right-5  dark:bg-gray-400 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
               onClick={() => dispatch(clearFiles())}>
               <span>X</span>
            </div>
         </div>}
      </>
   )
}

export default ChatUploadFile