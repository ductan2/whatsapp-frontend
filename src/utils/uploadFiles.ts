/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { FileType } from "../types/type.custom";

const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME
const cloud_secret = import.meta.env.VITE_CLOUDINARY_API_SECRET

export const uploadFiles = async (files: FileType[]) => {
   const formData = new FormData();

   formData.append('upload_preset', cloud_secret);
   const uploaded: { file: any, type: string }[] = []
   for (const f of files) {
      const { file, type } = f
      console.log("🚀 ~ file: uploadFiles.ts:16 ~ uploadFiles ~ file:", file)
      formData.append('file', file);
      const res: any = await uploadToCloudinary(formData)
      uploaded.push({
         file: res.data,
         type,
      })
   }
   return uploaded
}
export const uploadToCloudinary = async (formData: FormData) => {
   // eslint-disable-next-line no-async-promise-executor
   return new Promise(async (resolve, reject) => {
      try {
         const data = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, formData);
         resolve(data);
      } catch (err) {
         reject(err);
      }
   })
}