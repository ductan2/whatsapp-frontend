import { capitalizeName } from "../../../utils/WordUpperCase";

const CallArea = ({ name }: { name: string }) => {
   return (
      <div className="absolute top-12 w-full p-1">
         <div className="flex flex-col items-center gap-y-1 ">
            <h1 className="text-white text-lg font-bold">{capitalizeName(name)}</h1>
            <span className="text-dark_text_2">Ring ring...</span>
         </div>
      </div>
   );
};

export default CallArea;
