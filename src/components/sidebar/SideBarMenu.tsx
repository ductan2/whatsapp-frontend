import { logout } from "../../feature/user/user.slice"
import { useAppDispatch } from "../../store/store"

const SideBarMenu = () => {
   const dispatch = useAppDispatch()
   return (
      <>
         <div className="absolute text-base font-semibold right-0 z-50 dark:bg-dark_bg_2 dark:text-dark_text_2 shadow-md w-52">
            <ul>
               <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                  <span>New group</span>
               </li>
               <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                  <span>New community</span>
               </li>
               <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                  <span>Started messsage</span>
               </li>
               <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                  <span>Profile</span>
               </li>
               <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
                  onClick={() => dispatch(logout())}>
                  <span>Logout</span>
               </li>

            </ul>
         </div>
      </>
   )
}

export default SideBarMenu