import { FaArrowRight, FaLock } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Header = () => {
   return (
      <header className="absolute top-0 w-full z-40 ">
         <div className="p-1 flex items-center justify-between">
            <button className="btn">
               <span>
                  <FaArrowRight className="fill-white" />
               </span>
            </button>
            <p className="flex items-center">
               <FaLock className="fill-white scale-75" />
               <span className="text-xs text-white ml-2">End-to-end Encrypted</span>
            </p>
            <button className="btn text-xl">
               <AiOutlineUsergroupAdd className="fill-white" />
            </button>
         </div>
      </header>
   );
};

export default Header;
