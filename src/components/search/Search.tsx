
import { AiOutlineSearch, AiOutlineArrowLeft, AiFillFilter } from 'react-icons/ai'
import { IUser } from "../../types/user.type"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import http from "../../utils/http"
import { debounce } from "lodash"
type Props = {
   searchResult: IUser[],
   show: boolean,
   search: string,
   setSearchResult: React.Dispatch<React.SetStateAction<IUser[]>>
   setSearch: React.Dispatch<React.SetStateAction<string>>
   setShow: React.Dispatch<React.SetStateAction<boolean>>

}
const Search = ({ search, searchResult, setSearchResult, setSearch, setShow, show }: Props) => {

   const { user } = useSelector((state: RootState) => state.user)
   const handleSearch = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value.trim() !== "") {
         try {
            const { data } = await http.get(`/user?search=${value}`, {
               headers: {
                  Authorization: `Bearer ${user.token}`
               }
            })
            setSearchResult(data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
         } catch (error: any) {
            console.log(error.response.data.message)
         }
      }
      else {
         setSearchResult([])
         setSearch("")
      }
   }, 1000)

   return (
      <div className="h-16 py-2">
         <div className="px-3 h-full">
            <div className="flex items-center gap-x-2">
               <div className="w-full dark:bg-dark_bg_2 flex items-center rounded-lg pl-3 min-h-[40px]">
                  {show || searchResult.length > 0 ?
                     <span className="w-8 text-2xl animate-rotate" onClick={() => { setSearch(""), setShow(false) }}>
                        <AiOutlineArrowLeft className="dark:fill-dark_svg_2 w-5" />
                     </span>
                     :
                     <span className="w-8 text-2xl">
                        <AiOutlineSearch className="dark:fill-dark_svg_2 w-5" />
                     </span>
                  }
                  <input type="text" value={search} placeholder="Search your chat" className="input"
                     onFocus={() => setShow(true)}
                     onBlur={() => {
                        searchResult.length === 0 && (
                           setShow(false), setSearch("")
                        )
                     }}
                     onChange={(e) => {
                        handleSearch(e), setSearch(e.target.value)
                     }}
                  />
               </div>
               <button className="btn text-2xl">
                  <AiFillFilter className="dark:fill-dark_svg_1" />
               </button>
            </div>
         </div>
      </div>
   )
}

export default Search