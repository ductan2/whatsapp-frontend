import { useState } from "react"
import Notifications from "../notifications/Notifications"
import SideBarHeader from "./SideBarHeader"
import Search from "../search/Search"
import Conversation from "../conversation/Conversation"
import { IUser } from "../../types/user.type"
import SearchResult from "../search/SearchResult"


const SideBar = () => {

   const [searchResult, setSearchResult] = useState<IUser[]>([])
   const [search, setSearch] = useState<string>("")
   const [show, setShow] = useState<boolean>(false)
   return (
      <div className="sm:w-[50%] lg:w-[40%] h-full select-none">
         <SideBarHeader />
         <Notifications />
         <Search search={search} show={show} setShow={setShow} setSearch={setSearch} searchResult={searchResult} setSearchResult={setSearchResult} />
         {!show ?
            <Conversation /> :
            <SearchResult setSearchResult={setSearchResult} search={search} data={searchResult} />
         }

      </div>
   )
}

export default SideBar