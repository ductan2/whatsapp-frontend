
import { IUser } from "../../types/user.type"
import UserResult from "./UserResult"


type Props = {
   data: IUser[]
   search: string
   setSearchResult: React.Dispatch<React.SetStateAction<IUser[]>>
}
const SearchResult = ({ data, search, setSearchResult }: Props) => {

   return (
      <div className="conversation scrollbar w-full ">
         <div>
            {search && <h3 className="text-base text-dark_text_4 text-center mb-5">Search in conversation of {search}</h3>}
            <div className="border-b dark:border-b-dark_bg_5"></div>
         </div>
         <div>
            <ul>
               {data && data.map((item) => {
                  return <UserResult setSearchResult={setSearchResult} key={item?._id} item={item} />
               })}
            </ul>
         </div>
      </div>
   )
}

export default SearchResult