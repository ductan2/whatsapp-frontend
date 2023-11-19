import React, { createContext, useState } from 'react';

import { ListUserOnline } from '../types/type.custom';


interface UserOnlineContextType {
   userOnline: ListUserOnline[]
   typing: string
   setUserOnline: React.Dispatch<React.SetStateAction<ListUserOnline[]>>
   setTyping: React.Dispatch<React.SetStateAction<string>>
}
const defaultValue: UserOnlineContextType = {
   userOnline: [],
   typing: "",
   setTyping: () => { },
   setUserOnline: () => { }
}
export type Props = {
   children?: React.ReactNode,

}
export const UserOnlineContext = createContext<UserOnlineContextType>(defaultValue);

export const UserOnlineProvider = ({ children }: Props) => {
   const [userOnline, setUserOnline] = useState<ListUserOnline[]>([]);
   const [typing, setTyping] = useState<string>("")
   return (
      <UserOnlineContext.Provider value={{ userOnline, setUserOnline, setTyping, typing }}>
         {children}
      </UserOnlineContext.Provider>
   )
};