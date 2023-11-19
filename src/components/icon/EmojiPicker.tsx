import { BsEmojiLaughingFill } from 'react-icons/bs'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import useClickOutside from '../../hook/useClickOutSide'
import { RefObject, useEffect, useState } from 'react'
import { type EmojiClickData } from 'emoji-picker-react'
type Props = {
   messageRef: RefObject<HTMLInputElement>,
   message: string
   setMessage: React.Dispatch<React.SetStateAction<string>>
}
const EmojiPickerApp = ({ messageRef, message, setMessage }: Props) => {
   const [openEmoji, setOpenEmoji] = useState(false)
   const [currentPos, setCurrenPos] = useState<number>(0)

   useEffect(() => {
      if (messageRef.current) {
         messageRef.current.selectionEnd = currentPos;
      }  
   }, [currentPos, messageRef])

   const domNode: RefObject<HTMLDivElement> = useClickOutside(() => {
      setOpenEmoji(false);
   });
   const handleSetEmoji = (emojiData: EmojiClickData) => {
      const { emoji } = emojiData;
      const ref = messageRef.current as HTMLInputElement
      ref.focus();
      const start = message.substring(0, ref.selectionStart as number)
      const end = message.substring(ref.selectionEnd as number)
      setMessage(start + emoji + end)
      setCurrenPos(start.length + emoji.length)
   }
   return (
      <div ref={domNode}>
         <button type='button' className="btn text-xl" onClick={() => setOpenEmoji(!openEmoji)}>
            <BsEmojiLaughingFill className="dark:fill-dark_svg_1" />
         </button>
         <div className='animate-open-emoji absolute bottom-[60px] -left-1'>
            {openEmoji && <EmojiPicker theme={Theme.DARK} onEmojiClick={handleSetEmoji} />}
         </div>
      </div>
   )
}

export default EmojiPickerApp