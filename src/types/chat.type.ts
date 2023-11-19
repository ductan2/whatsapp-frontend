import { FileType } from "./type.custom";
import { IUser } from "./user.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMessage {
   _id: string
   message: string
   sender: IUser
   conversation: string
   files: any[]
   createdAt?: string
}
export interface IChat {
   conversation: IConversation[],
   active_conversation: IConversation | null,
   notification: any
   messages: IMessage[]
   files: FileType[]
}
export interface IConversation {
   _id?: string
   name: string;
   picture?: string;
   isGroup: boolean;
   users: IUser[];
   latestMessage?: ILatestMessage | null;
   admin?: string;

}
export interface ILatestMessage {
   _id: string;
   sender: string;
   message: string;
   conversation: string;
   files: any[];
   updatedAt?: string;
   createdAt?: string;
}