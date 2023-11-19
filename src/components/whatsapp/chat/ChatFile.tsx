/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCloudDownloadAlt } from "react-icons/fa";
const ChatFile = ({ files }: { files: { file: any, type: string }[] }) => {
   return (
      <>
         {files.map(({ file, type }) => {
            return (
               type === "VIDEO" ? <video src={file.secure_url} className="w-[300px] h-[250px] object-cover" controls /> :
                  type === "IMAGE" ? <img className="object-cover w-full h-full" src={file.url} /> : <div className="flex items-center justify-between pr-10 gap-3">
                     <img src={`filesImg/${type}.png`} alt={file.public_id + "picture"} className="max-w-[50px] max-h-[50px] object-cover" />
                     <div>
                        <span className="text-base text-white">{file.original_filename}.{file.public_id.split(".")[1]}</span>
                        <br />
                        <span className="text-sm text-gray-400">{file.bytes / 1000} KB</span>
                     </div>
                     <div className="text-2xl cursor-pointer ">
                        <FaCloudDownloadAlt className="dark:fill-dark_svg_1" />
                     </div>
                  </div>
            )
         })}
      </>
   )
}

export default ChatFile