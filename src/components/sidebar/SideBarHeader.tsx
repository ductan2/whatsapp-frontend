import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { HiUserGroup } from 'react-icons/hi'
import { BsFillChatFill, BsThreeDotsVertical, BsClockHistory } from 'react-icons/bs'
import { useState } from "react"
import SideBarMenu from "./SideBarMenu"
const SideBarHeader = () => {
   const { user } = useSelector((state: RootState) => state.user)

   const [showMenu, setShowMenu] = useState(false)

   return (
      <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p-4">
         <div className="w-full flex items-center justify-between">
            <button className="btn">
               <img src={user.avatar} alt="avatar" className="h-full w-full rounded-full object-cover" />
            </button>
            <ul className="flex items-center gap-x-2 text-xl">
               <li>
                  <button className="btn">
                     <HiUserGroup className="dark:fill-dark_svg_1" />
                  </button>
               </li>
               <li>
                  <button className="btn">
                     <BsFillChatFill className="dark:fill-dark_svg_1" />
                  </button>
               </li>
               <li>
                  <button className="btn">
                     <BsClockHistory className="dark:fill-dark_svg_1" />
                  </button>
               </li>
               <li className="relative">
                  <button className="btn" onClick={() => setShowMenu(!showMenu)}>
                     <BsThreeDotsVertical className="dark:fill-dark_svg_1" />
                  </button>
                  {showMenu && (<SideBarMenu />)}
               </li>
            </ul>
         </div>
      </div>
   )
}

export default SideBarHeader