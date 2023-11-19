import { IUser } from "../types/user.type"

export const getConversationId = (user: IUser, listUser: IUser[]) => {
   return listUser[0]._id == user._id ? listUser[1]._id : listUser[0]._id
}
export const getConversationName = (user: IUser, listUser: IUser[]) => {
   return listUser[0].name === user.name ? listUser[1].name : listUser[0].name
}
export const getConversationAvatar = (user: IUser, listUser: IUser[]) => {
   return listUser[0].avatar === user.avatar ? listUser[1]?.avatar : listUser[0]?.avatar
}